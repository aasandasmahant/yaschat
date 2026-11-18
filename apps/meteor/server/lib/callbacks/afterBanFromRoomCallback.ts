import type { IRoom, IUser } from '@yas chat/core-typings';

import { Callbacks } from './callbacksBase';

export const afterBanFromRoomCallback =
	Callbacks.create<(data: { bannedUser: IUser; userWhoBanned: IUser }, room: IRoom) => void>('afterBanFromRoom');
