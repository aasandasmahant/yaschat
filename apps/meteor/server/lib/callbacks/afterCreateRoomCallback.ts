import type { IUser, IRoom, MinimalApp } from '@yas chat/core-typings';

import { Callbacks } from './callbacksBase';

export const afterCreateRoomCallback = Callbacks.create<(data: { owner: IUser; room: IRoom; app?: MinimalApp }) => void>('afterCreateRoom');
