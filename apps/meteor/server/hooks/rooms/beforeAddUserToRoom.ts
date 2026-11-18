import type { IRoom, IUser } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export const beforeAddUserToRoom = makeFunction(async (_users: IUser['username'][], _room: IRoom, _actor?: IUser) => {
	// no op on CE
});
