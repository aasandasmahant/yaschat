import type * as UiKit from '@yas chat/ui-kit';

export const markdown: readonly UiKit.LayoutBlock[] = [
	{
		type: 'markdown',
		text: '**Release notes**\n\n- Faster search\n- New `markdown` block\n\nSee the [docs](https://docs.yas chat) for details.',
	},
] as const;
