import type { IRoom, IRoomAbacRedaction, RoomAdminFieldsType } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export const scopeAdminRoomsForAbac = makeFunction(
	async (rooms: Pick<IRoom, RoomAdminFieldsType>[], _uid: string): Promise<Array<Pick<IRoom, RoomAdminFieldsType> & IRoomAbacRedaction>> =>
		rooms,
);
