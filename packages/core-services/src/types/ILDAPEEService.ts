import type { IUser } from '@yas chat/core-typings';
import type { FindCursor } from 'mongodb';

export interface ILDAPEEService {
	sync(): Promise<void>;
	syncAvatars(): Promise<void>;
	syncAvatarAndAbacAttributes(): Promise<void>;
	syncLogout(): Promise<void>;
	syncAbacAttributes(): Promise<void>;
	syncUsersAbacAttributes(users: FindCursor<IUser>): Promise<void>;
	syncUsersAbacAttributesByIds(userIds: string[]): Promise<void>;
}
