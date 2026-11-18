import { ServiceClassInternal, type ILDAPEEService } from '@yas chat/core-services';
import type { IUser } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';
import type { FindCursor } from 'mongodb';

import { LDAPEEManager } from '../../lib/ldap/EEManager';

export class LDAPEEService extends ServiceClassInternal implements ILDAPEEService {
	protected name = 'ldap-enterprise';

	async sync(): Promise<void> {
		return LDAPEEManager.sync();
	}

	async syncAvatars(): Promise<void> {
		return LDAPEEManager.syncAvatars();
	}

	async syncAvatarAndAbacAttributes(): Promise<void> {
		return LDAPEEManager.syncAvatarAndAbacAttributes();
	}

	async syncLogout(): Promise<void> {
		return LDAPEEManager.syncLogout();
	}

	async syncAbacAttributes(): Promise<void> {
		return LDAPEEManager.syncAbacAttributes();
	}

	async syncUsersAbacAttributes(users: FindCursor<IUser>): Promise<void> {
		return LDAPEEManager.syncUsersAbacAttributes(users);
	}

	async syncUsersAbacAttributesByIds(userIds: string[]): Promise<void> {
		return LDAPEEManager.syncUsersAbacAttributes(Users.findActiveLDAPUsersByIds(userIds));
	}
}
