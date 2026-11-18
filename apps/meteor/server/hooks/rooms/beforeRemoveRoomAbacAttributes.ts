import type { IRoom, IUser } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export const beforeRemoveRoomAbacAttributes = makeFunction(
	async (_room: Pick<IRoom, '_id' | 'abacAttributes'>, _actor: Pick<IUser, '_id' | 'username' | 'name'>) => {
		// no op on CE
	},
);
