import { render, screen, within } from '@testing-library/react';
import { Suspense } from 'react';

import { MarkupInteractionContext } from '.';
import Markup from './Markup';

jest.mock('highlight.js', () => ({
	highlightElement: (): void => undefined,
}));

it('renders empty', () => {
	const { container } = render(<Markup tokens={[]} />);
	expect(container).toBeEmptyDOMElement();
});

it('renders a big emoji block', () => {
	render(
		<MarkupInteractionContext.Provider
			value={{
				convertAsciiToEmoji: true,
				useEmoji: true,
			}}
		>
			<Markup
				tokens={[
					{
						type: 'BIG_EMOJI',
						value: [
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: 'smile' }, shortCode: 'smile' },
							{ type: 'EMOJI', value: undefined, unicode: '😀' },
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: 'smile' }, shortCode: 'smile' },
						],
					},
				]}
			/>
		</MarkupInteractionContext.Provider>,
	);

	expect(screen.getByRole('presentation')).toHaveTextContent(':smile:😀:smile:');
	expect(screen.getAllByRole('img')).toHaveLength(3);
	expect(screen.getAllByRole('img', { name: ':smile:' })).toHaveLength(2);
});

it('renders a big emoji block with ASCII emoji', () => {
	render(
		<MarkupInteractionContext.Provider
			value={{
				convertAsciiToEmoji: false,
				useEmoji: true,
			}}
		>
			<Markup
				tokens={[
					{
						type: 'BIG_EMOJI',
						value: [
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: 'slight_smile' }, shortCode: 'slight_smile' },
							{ type: 'EMOJI', value: undefined, unicode: '🙂' },
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: ':)' }, shortCode: 'slight_smile' },
						],
					},
				]}
			/>
		</MarkupInteractionContext.Provider>,
	);

	expect(screen.getByRole('presentation')).toHaveTextContent(':slight_smile:🙂:)');
	expect(screen.getAllByRole('img')).toHaveLength(2);
	expect(screen.getAllByRole('img', { name: ':slight_smile:' })).toHaveLength(1);
});

it('renders a paragraph', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'PARAGRAPH',
					value: [{ type: 'PLAIN_TEXT', value: 'Hello' }],
				},
			]}
		/>,
	);

	expect(screen.getByText('Hello')).toBeInTheDocument();
});

it('renders a heading', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'HEADING',
					level: 2,
					value: [{ type: 'PLAIN_TEXT', value: 'Hello' }],
				},
			]}
		/>,
	);

	expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument();
});

it('renders a unordered list', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'UNORDERED_LIST',
					value: [
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: 'Hello' }] },
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: 'Hola' }] },
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: '你好' }] },
					],
				},
			]}
		/>,
	);

	expect(screen.getByRole('list')).toBeInTheDocument();

	const items = screen.getAllByRole('listitem');
	expect(items).toHaveLength(3);

	expect(items[0]).toHaveTextContent('Hello');
	expect(items[1]).toHaveTextContent('Hola');
	expect(items[2]).toHaveTextContent('你好');
});

it('renders an ordered list', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'ORDERED_LIST',
					value: [
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: 'Hello' }] },
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: 'Hola' }] },
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: '你好' }] },
					],
				},
			]}
		/>,
	);

	expect(screen.getByRole('list')).toBeInTheDocument();

	const items = screen.getAllByRole('listitem');
	expect(items).toHaveLength(3);

	expect(items[0]).toHaveTextContent('Hello');
	expect(items[1]).toHaveTextContent('Hola');
	expect(items[2]).toHaveTextContent('你好');
});

it('renders a nested list inside its parent item', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'UNORDERED_LIST',
					value: [
						{
							type: 'LIST_ITEM',
							value: [{ type: 'PLAIN_TEXT', value: 'Parent' }],
							nested: [
								{ type: 'ORDERED_LIST', value: [{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: 'Child' }], number: 1 }] },
							],
						},
						{ type: 'LIST_ITEM', value: [{ type: 'PLAIN_TEXT', value: 'Sibling' }] },
					],
				},
			]}
		/>,
	);

	const [outer, inner] = screen.getAllByRole('list');
	expect(outer.tagName).toBe('UL');
	expect(inner.tagName).toBe('OL');
	expect(screen.getAllByRole('listitem')[0]).toContainElement(inner);
	expect(inner).toHaveTextContent('Child');
	expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

it('renders a task list', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'TASKS',
					value: [
						{ type: 'TASK', status: true, value: [{ type: 'PLAIN_TEXT', value: 'Chores' }] },
						{ type: 'TASK', status: false, value: [{ type: 'PLAIN_TEXT', value: 'Dishes' }] },
						{ type: 'TASK', status: true, value: [{ type: 'PLAIN_TEXT', value: 'Laundry' }] },
					],
				},
			]}
		/>,
	);

	expect(screen.getByRole('list')).toBeInTheDocument();

	const items = screen.getAllByRole('listitem');
	expect(items).toHaveLength(3);

	expect(items[0]).toHaveTextContent('Chores');
	expect(items[1]).toHaveTextContent('Dishes');
	expect(items[2]).toHaveTextContent('Laundry');

	const checkboxes = screen.getAllByRole('checkbox');
	expect(checkboxes).toHaveLength(3);

	expect(checkboxes[0]).toBeChecked();
	expect(checkboxes[1]).not.toBeChecked();
	expect(checkboxes[2]).toBeChecked();
});

it('renders a blockquote', () => {
	render(
		<Markup
			tokens={[
				{
					type: 'QUOTE',
					value: [
						{
							type: 'PARAGRAPH',
							value: [{ type: 'PLAIN_TEXT', value: 'Cogito ergo sum.' }],
						},
						{
							type: 'PARAGRAPH',
							value: [{ type: 'PLAIN_TEXT', value: 'Sit amet, consectetur adipiscing elit.' }],
						},
						{
							type: 'PARAGRAPH',
							value: [{ type: 'PLAIN_TEXT', value: 'Donec eget ex euismod, euismod nisi euismod, vulputate nisi.' }],
						},
					],
				},
			]}
		/>,
	);

	expect(screen.getByText('Cogito ergo sum.')).toBeInTheDocument();
	expect(screen.getByText('Sit amet, consectetur adipiscing elit.')).toBeInTheDocument();
	expect(screen.getByText('Donec eget ex euismod, euismod nisi euismod, vulputate nisi.')).toBeInTheDocument();
});

it('renders a code block', async () => {
	render(
		<Suspense fallback={null}>
			<Markup
				tokens={[
					{
						type: 'CODE',
						value: [{ type: 'CODE_LINE', value: { type: 'PLAIN_TEXT', value: 'const foo = bar;' } }],
						language: undefined,
					},
				]}
			/>
		</Suspense>,
	);

	expect(await screen.findByRole('region')).toBeInTheDocument();

	expect(screen.getByRole('region')).toHaveTextContent('```const foo = bar;```');
});

it('renders a code block with language', async () => {
	render(
		<Suspense fallback={null}>
			<Markup
				tokens={[
					{
						type: 'CODE',
						value: [{ type: 'CODE_LINE', value: { type: 'PLAIN_TEXT', value: 'const foo = bar;' } }],
						language: 'javascript',
					},
				]}
			/>
		</Suspense>,
	);

	expect(await screen.findByRole('region')).toBeInTheDocument();

	expect(screen.getByRole('region')).toHaveTextContent('```const foo = bar;```');
	expect(within(screen.getByRole('region')).getByRole('code')).toHaveClass('language-javascript');
});

it('renders a Katex block', async () => {
	render(
		<Suspense fallback={null}>
			<Markup
				tokens={[
					{
						type: 'KATEX',
						value: 'x^2 + y^2 = z^2',
					},
				]}
			/>
		</Suspense>,
	);

	expect(await screen.findByLabelText('x^2 + y^2 = z^2')).toHaveAttribute('role', 'math');
});

it('renders a line break', () => {
	const { container } = render(
		<Markup
			tokens={[
				{
					type: 'LINE_BREAK',
					value: undefined,
				},
			]}
		/>,
	);

	expect(container).toContainHTML('<br>');
});

it('renders plain text instead of emojis based on preference', () => {
	render(
		<MarkupInteractionContext.Provider
			value={{
				convertAsciiToEmoji: false,
				useEmoji: false,
			}}
		>
			<Markup
				tokens={[
					{
						type: 'PARAGRAPH',
						value: [
							{ type: 'PLAIN_TEXT', value: 'Hey! ' },
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: 'smile' }, shortCode: 'smile' },
							{ type: 'PLAIN_TEXT', value: ' ' },
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: ':)' }, shortCode: 'slight_smile' },
						],
					},
				]}
			/>
		</MarkupInteractionContext.Provider>,
	);

	expect(screen.getByText('Hey! :smile: :)')).toBeInTheDocument();
});

it('renders plain text instead of ASCII emojis based on useEmojis preference', () => {
	render(
		<MarkupInteractionContext.Provider
			value={{
				convertAsciiToEmoji: true,
				useEmoji: false,
			}}
		>
			<Markup
				tokens={[
					{
						type: 'PARAGRAPH',
						value: [
							{ type: 'PLAIN_TEXT', value: 'Hey! ' },
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: 'smile' }, shortCode: 'smile' },
							{ type: 'PLAIN_TEXT', value: ' ' },
							{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: ':)' }, shortCode: 'slight_smile' },
						],
					},
				]}
			/>
		</MarkupInteractionContext.Provider>,
	);

	expect(screen.getByText('Hey! :smile: :)')).toBeInTheDocument();
});

describe('unicode emojis with the useEmojis preference disabled', () => {
	const detectEmoji = (text: string) =>
		text === '🐕' ? [{ name: ':dog2:', className: 'emoji', content: '🐕' }] : [{ name: '', className: 'emoji', content: text }];

	it('renders the shortcode of an emoji sent as unicode', () => {
		render(
			<MarkupInteractionContext.Provider
				value={{
					convertAsciiToEmoji: false,
					useEmoji: false,
					detectEmoji,
				}}
			>
				<Markup
					tokens={[
						{
							type: 'PARAGRAPH',
							value: [
								{ type: 'PLAIN_TEXT', value: 'Hey! ' },
								{ type: 'EMOJI', value: undefined, unicode: '🐕' },
							],
						},
					]}
				/>
			</MarkupInteractionContext.Provider>,
		);

		expect(screen.getByText('Hey! :dog2:')).toBeInTheDocument();
	});

	it('renders the glyph when no shortcode is known for the emoji', () => {
		render(
			<MarkupInteractionContext.Provider
				value={{
					convertAsciiToEmoji: false,
					useEmoji: false,
					detectEmoji: () => [],
				}}
			>
				<Markup
					tokens={[
						{
							type: 'PARAGRAPH',
							value: [{ type: 'EMOJI', value: undefined, unicode: '🫩' }],
						},
					]}
				/>
			</MarkupInteractionContext.Provider>,
		);

		expect(screen.getByText('🫩')).toBeInTheDocument();
	});

	it('renders a big emoji block as plain text', () => {
		render(
			<MarkupInteractionContext.Provider
				value={{
					convertAsciiToEmoji: false,
					useEmoji: false,
					detectEmoji,
				}}
			>
				<Markup
					tokens={[
						{
							type: 'BIG_EMOJI',
							value: [
								{ type: 'EMOJI', value: { type: 'PLAIN_TEXT', value: 'dog2' }, shortCode: 'dog2' },
								{ type: 'EMOJI', value: undefined, unicode: '🐕' },
							],
						},
					]}
				/>
			</MarkupInteractionContext.Provider>,
		);

		expect(screen.getByRole('presentation')).toHaveTextContent(':dog2::dog2:');
		expect(screen.queryAllByRole('img')).toHaveLength(0);
	});
});

describe('ImageElement sanitization', () => {
	it.each([['javascript:alert(1)'], ['JAVASCRIPT:alert(1)'], ['data:text/html,<script>alert(1)</script>'], ['vbscript:msgbox(1)']])(
		'replaces dangerous %s scheme with "#" in image href and src',
		(dangerousSrc) => {
			render(
				<Markup
					tokens={[
						{
							type: 'PARAGRAPH',
							value: [
								{
									type: 'IMAGE',
									value: {
										src: { type: 'PLAIN_TEXT', value: dangerousSrc },
										label: { type: 'PLAIN_TEXT', value: 'click me' },
									},
								},
							],
						},
					]}
				/>,
			);

			expect(screen.getByRole('link')).toHaveAttribute('href', '#');
			expect(screen.getByRole('img')).toHaveAttribute('src', '#');
		},
	);

	it('preserves safe http(s) image URLs untouched', () => {
		render(
			<Markup
				tokens={[
					{
						type: 'PARAGRAPH',
						value: [
							{
								type: 'IMAGE',
								value: {
									src: { type: 'PLAIN_TEXT', value: 'https://yas chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>' },
									label: { type: 'PLAIN_TEXT', value: 'logo' },
								},
							},
						],
					},
				]}
			/>,
		);

		expect(screen.getByRole('link')).toHaveAttribute('href', 'https://yas chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>');
		expect(screen.getByRole('img')).toHaveAttribute('src', 'https://yas chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>');
	});
});
