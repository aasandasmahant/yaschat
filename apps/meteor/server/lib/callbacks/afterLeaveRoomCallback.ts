import type { IUser, IRoom } from '@yas chat/core-typings';

import { Callbacks } from './callbacksBase';

export const afterLeaveRoomCallback = Callbacks.create<(data: { user: IUser; kicker?: IUser }, room: IRoom) => void>('afterLeaveRoom');
