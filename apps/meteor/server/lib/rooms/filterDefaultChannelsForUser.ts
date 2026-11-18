import type { IRoom, IUser } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export type FilterDefaultChannelsOptions = { refreshUserAttributes?: boolean; audit?: boolean };

export const filterDefaultChannelsForUser = makeFunction(
	async (rooms: IRoom[], _user: IUser, _options?: FilterDefaultChannelsOptions): Promise<IRoom[]> => rooms,
);
