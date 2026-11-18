import type { IRoom } from '@yas chat/core-typings';

import { Callbacks } from './callbacksBase';

export const beforeChangeRoomRole =
	Callbacks.create<(args: { fromUserId: string; userId: string; room: IRoom; role: 'moderator' | 'owner' | 'leader' | 'user' }) => void>(
		'beforeChangeRoomRole',
	);
