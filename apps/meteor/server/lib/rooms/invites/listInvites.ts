import { ClientSafeError } from '@yas chat/core-services';
import { Invites } from '@yas chat/models';

import { hasPermissionAsync } from '../../authorization/hasPermission';

export const listInvites = async (userId: string) => {
	if (!userId) {
		throw new ClientSafeError('error-unauthenticated', 'Unauthenticated', { method: 'listInvites' });
	}

	if (!(await hasPermissionAsync(userId, 'create-invite-links'))) {
		throw new ClientSafeError('not_authorized');
	}

	return Invites.find({}).toArray();
};
