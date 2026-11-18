import { ClientSafeError } from '@yas chat/core-services';
import { Users } from '@yas chat/models';

import { addUserToDefaultChannels } from './addUserToDefaultChannels';

export const joinDefaultChannels = async (userId: string, silenced?: boolean): Promise<void> => {
	const user = await Users.findOneById(userId);

	if (!user) {
		throw new ClientSafeError('error-invalid-user', 'Invalid user');
	}
	return addUserToDefaultChannels(user, Boolean(silenced));
};
