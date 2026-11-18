import { AppEvents, Apps } from '@yas chat/apps';
import type { IUser } from '@yas chat/core-typings';
import { Accounts } from 'meteor/accounts-base';

import { afterLogoutCleanUpCallback } from '../lib/callbacks/afterLogoutCleanUpCallback';

export const runUserLogoutCleanUp = async (user: IUser): Promise<void> => {
	setImmediate(() => {
		void afterLogoutCleanUpCallback.run(user);
	});

	await Apps.self?.triggerEvent(AppEvents.IPostUserLoggedOut, user);
};

Accounts.onLogout(async ({ user }: { user?: IUser }) => {
	if (!user) {
		return;
	}

	await runUserLogoutCleanUp(user);
});
