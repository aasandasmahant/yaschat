import type { IRoom } from '@yas chat/core-typings';
import { Box } from '@yas chat/fuselage';
import { Contextualbar } from '@yas chat/ui-client';
import type { Meta } from '@storybook/react';

import TeamsInfo from './TeamsInfo';

const room = {
	_id: 'awdawd',
	fname: 'yaschat-frontend-team',
	description:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit libero',
	announcement:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit libero',
	topic:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis nisi vel arcu bibendum vehicula. Integer vitae suscipit libero',
} as IRoom;

export default {
	component: TeamsInfo,
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
	args: {
		room,
	},
} satisfies Meta<typeof TeamsInfo>;

export const Default = {};

export const Archived = {
	args: {
		room: { ...room, archived: true },
	},
};

export const Broadcast = {
	args: {
		room: { ...room, broadcast: true },
	},
};
