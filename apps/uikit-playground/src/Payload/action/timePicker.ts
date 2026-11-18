import type { LayoutBlock } from '@yas chat/ui-kit';

export const actionWithTimePicker: readonly LayoutBlock[] = [
	{
		type: 'actions',
		elements: [
			{
				type: 'time_picker',
				initialTime: '10:30',
				appId: 'app-id',
				blockId: 'block-id',
				actionId: 'action-id',
				placeholder: {
					type: 'plain_text',
					text: 'Select a time',
					emoji: true,
				},
			},
		],
	},
];
