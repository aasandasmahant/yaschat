import { Box } from '@yas chat/fuselage';
import { Contextualbar } from '@yas chat/ui-client';
import type { StoryObj, Meta } from '@storybook/react';

import AddUsers from './AddUsers';

export default {
	component: AddUsers,
	parameters: {
		layout: 'fullscreen',
		actions: { argTypesRegex: '^on.*' },
	},
	decorators: [
		(fn) => (
			<Box height='100vh'>
				<Contextualbar>{fn()}</Contextualbar>
			</Box>
		),
	],
} satisfies Meta<typeof AddUsers>;

export const Default: StoryObj<typeof AddUsers> = {
	name: 'AddUsers',
};
