import { Box } from '@yaschat/fuselage';
import { Contextualbar } from '@yaschat/ui-client';
import type { StoryObj, Meta } from '@storybook/react';

import ExportMessages from './index';

export default {
	component: ExportMessages,
	parameters: {
		layout: 'fullscreen',
	},
	decorators: [
		(fn) => (
			<Box height='100vh'>
				<Contextualbar>{fn()}</Contextualbar>
			</Box>
		),
	],
} satisfies Meta<typeof ExportMessages>;

export const Default: StoryObj<typeof ExportMessages> = {
	render: () => <ExportMessages />,
	name: 'ExportMessages',
};
