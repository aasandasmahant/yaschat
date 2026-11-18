import type { RoomType } from '@yas chat/core-typings';
import { Box } from '@yas chat/fuselage';
import { mockAppRoot } from '@yas chat/mock-providers';
import { Contextualbar } from '@yas chat/ui-client';
import type { Meta, StoryObj } from '@storybook/react';

import RoomInfo from './RoomInfo';
import FakeRoomProvider from '../../../../../../tests/mocks/client/FakeRoomProvider';

export default {
	component: RoomInfo,
	parameters: {
		layout: 'fullscreen',
		actions: { argTypesRegex: '^on[A-Z].*' },
	},
	decorators: [
		(fn) => (
			<FakeRoomProvider roomOverrides={roomArgs}>
				<Box height='100vh'>
					<Contextualbar>{fn()}</Contextualbar>
				</Box>
			</FakeRoomProvider>
		),
	],
	args: {
		icon: 'lock',
	},
} satisfies Meta<typeof RoomInfo>;

const roomArgs = {
	_id: 'myRoom',
	t: 'c' as RoomType,
	msgs: 5,
	usersCount: 1,
	u: {
		_id: 'yaschat.internal.admin.test',
		username: 'yaschat.internal.admin.test',
	},
	ts: new Date(),
	autoTranslateLanguage: 'en',
	_updatedAt: new Date(),
	fname: 'yaschat-frontend-team',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit libero',
	announcement:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit libero',
	topic:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit libero',
};

export const Default = {
	args: {
		room: roomArgs,
	},
};

export const Archived = {
	args: {
		...Default.args,
		room: {
			...roomArgs,
			archived: true,
		},
	},
};

export const Broadcast = {
	args: {
		...Default.args,
		room: {
			...roomArgs,
			broadcast: true,
		},
	},
};

export const ABAC: StoryObj<typeof RoomInfo> = {
	decorators: [
		mockAppRoot().withSetting('ABAC_Enabled', true).withSetting('ABAC_ShowAttributesInRooms', true).buildStoryDecorator(),
		(fn) => (
			<FakeRoomProvider roomOverrides={roomArgs}>
				<Box height='100vh'>
					<Contextualbar>{fn()}</Contextualbar>
				</Box>
			</FakeRoomProvider>
		),
	],

	args: {
		...Default.args,
		room: {
			...roomArgs,
			abacAttributes: [
				{ key: 'Chat-sensitivity', values: ['Classified', 'Top-Secret'] },
				{ key: 'Country', values: ['US-only'] },
				{ key: 'Project', values: ['Ruminator-2000'] },
			],
		},
	},
};
