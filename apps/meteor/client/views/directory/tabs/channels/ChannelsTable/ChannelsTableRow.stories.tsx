import type { IRoom, Serialized } from '@yaschat/core-typings';
import { Box } from '@yaschat/fuselage';
import { mockAppRoot } from '@yaschat/mock-providers';
import { GenericTable, GenericTableBody } from '@yaschat/ui-client';
import type { Meta, StoryObj } from '@storybook/react';

import ChannelsTableRow from './ChannelsTableRow';
import '../../../../../lib/rooms/roomTypes/public';
import { createFakeRoom } from '../../../../../../tests/mocks/data';

export default {
	component: ChannelsTableRow,
	parameters: {
		layout: 'padded',
	},
	decorators: [
		(Story) => {
			const AppRoot = mockAppRoot().build();
			return (
				<AppRoot>
					<Box maxWidth='x640'>
						<GenericTable>
							<GenericTableBody>
								<Story />
							</GenericTableBody>
						</GenericTable>
					</Box>
				</AppRoot>
			);
		},
	],
	args: {
		onClick: () => () => undefined,
		mediaQuery: false,
	},
} satisfies Meta<typeof ChannelsTableRow>;

type Story = StoryObj<typeof ChannelsTableRow>;

export const DefaultAndFeatured: Story = {
	args: {
		room: JSON.parse(
			JSON.stringify(createFakeRoom({ t: 'c', name: 'general', default: true, featured: true, topic: 'Company-wide announcements' })),
		) as Serialized<IRoom>,
	},
};
