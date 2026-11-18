import type { IRoom } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export const beforeSendMessageToRoom = makeFunction(async (_room: IRoom) => {
	// no op on CE
});
