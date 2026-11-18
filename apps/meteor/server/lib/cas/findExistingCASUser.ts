import type { IUser } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';

import { settings } from '../../settings';

export const findExistingCASUser = async (username: string): Promise<IUser | undefined> => {
	const casUser = await Users.findOne({ 'services.cas.external_id': username });
	if (casUser) {
		return casUser;
	}

	if (!settings.get<boolean>('CAS_trust_username')) {
		return;
	}

	// If that user was not found, check if there's any YasChat user with that username
	// With this, CAS login will continue to work if the user is renamed on both sides and also if the user is renamed only on YasChat.
	// It'll also allow non-CAS users to switch to CAS based login
	// Update the user's external_id to reflect this new username.
	return (await Users.setCasExternalIdByUsername(username)) ?? undefined;
};
