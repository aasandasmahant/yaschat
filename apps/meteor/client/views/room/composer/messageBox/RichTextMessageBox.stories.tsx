import { ComposerMarkup, ComposerMarkupContext } from '@rocket.chat/gazzodown-alt';
import type { Options } from '@rocket.chat/message-parser';
import { parse } from '@rocket.chat/message-parser';
import {
	MessageComposer,
	MessageComposerAction,
	MessageComposerActionsDivider,
	MessageComposerToolbar,
	MessageComposerToolbarActions,
	MessageComposerToolbarSubmit,
	RichTextComposerInput,
} from '@rocket.chat/ui-composer';
import type { Meta, StoryObj } from '@storybook/react';

// Mirrors the options RichTextMessageBox feeds the parser: emoticons, KaTeX and colors are all off
// there, so nodes gated behind them never reach ComposerMarkup.
const parseOptions: Options = { emoticons: false, customDomains: [] };

const markdownSample = [
	'# Heading one',
	'## Heading two',
	'### Heading three',
	'#### Heading four',
	'',
	'Plain text with *bold*, **bold double**, _italic_, ~strike~, ~~strike double~~, `inline code`, ||inline spoiler|| and an escaped \\*asterisk\\*.',
	'',
	'Mentions @rocket.cat and #general, emoji :smile: and 😀.',
	'',
	'Links [markdown link](https://rocket.chat), <https://rocket.chat|angle bracket link>, bare https://rocket.chat, support@rocket.chat, +15551234567 and ![alt text](https://rocket.chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>).',
	'',
	'Timestamp <t:1700000000:F>, escaped \\<t:1700000000:F> and color:#ff0000.',
	'',
	'> Quote line one',
	'> Quote line two',
	'',
	'||',
	'Spoiler block line one',
	'Spoiler block line two',
	'||',
	'',
	'- Hyphen list item',
	'- Second hyphen item',
	'',
	'* Asterisk list item',
	'* Second asterisk item',
	'',
	'1. Ordered item one',
	'2. Ordered item two',
	'',
	'- [x] Completed task',
	'- [ ] Pending task',
	'',
	'| Column A | Column B |',
	'| --- | ---: |',
	'| cell one | cell two |',
	'',
	'---',
	'',
	'```js',
	"const fenced = 'code block';",
	'```',
].join('\n');

// Labels mirror `formattingButtons` so the toolbar is as accessible here as it is in MessageBoxBase.
const formatters = [
	{ icon: 'bold', label: 'Bold' },
	{ icon: 'italic', label: 'Italic' },
	{ icon: 'strike', label: 'Strikethrough' },
	{ icon: 'code', label: 'Inline code' },
	{ icon: 'multiline', label: 'Multi line code' },
	{ icon: 'list-bullets', label: 'Bulleted list' },
	{ icon: 'list-numbers', label: 'Numbered list' },
	{ icon: 'link', label: 'Link' },
	{ icon: 'katex', label: 'KaTeX' },
] as const;

type RealTimeComposerProps = {
	source: string;
	placeholder: string;
};

const RealTimeComposer = ({ source, placeholder }: RealTimeComposerProps) => (
	<MessageComposer>
		<ComposerMarkupContext.Provider value={{ source }}>
			<RichTextComposerInput name='msg' aria-label={placeholder} placeholder={placeholder} hideplaceholder={source !== ''}>
				{source !== '' && <ComposerMarkup tokens={parse(source, parseOptions)} />}
			</RichTextComposerInput>
		</ComposerMarkupContext.Provider>
		<MessageComposerToolbar>
			<MessageComposerToolbarActions aria-label='Message actions'>
				<MessageComposerAction aria-label='Emoji' icon='emoji' />
				<MessageComposerActionsDivider />
				{formatters.map(({ icon, label }) => (
					<MessageComposerAction key={icon} aria-label={label} icon={icon} />
				))}
			</MessageComposerToolbarActions>
			<MessageComposerToolbarSubmit>
				<MessageComposerAction aria-label='Send' icon='send' disabled={source === ''} variant={source !== '' ? 'primary' : undefined} />
			</MessageComposerToolbarSubmit>
		</MessageComposerToolbar>
	</MessageComposer>
);

const meta = {
	title: 'Composer/RealTimeComposer',
	component: RealTimeComposer,
	args: {
		placeholder: 'Message',
		source: '',
	},
} satisfies Meta<typeof RealTimeComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithText: Story = {
	args: {
		source: markdownSample,
	},
};
