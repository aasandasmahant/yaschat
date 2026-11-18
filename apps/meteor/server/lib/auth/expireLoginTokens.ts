import { api } from '@yas chat/core-services';
import type { IUser } from '@yas chat/core-typings';
import { Settings, Users } from '@yas chat/models';
import { getLoginExpirationInMs } from '@yas chat/tools';

export async function expireLoginTokens(): Promise<void> {
	const loginExpiration = await Settings.getValueById<number>('Accounts_LoginExpiration');
	const oldestValidDate = new Date(Date.now() - getLoginExpirationInMs(loginExpiration));

	const users = await Users.findWithLoginTokensOlderThan<Pick<IUser, '_id' | 'services'>>(oldestValidDate, {
		projection: { 'services.resume.loginTokens': 1 },
	}).toArray();

	await Users.removeLoginTokensOlderThan(oldestValidDate);

	// lets sessions that resumed with an expired token disconnect
	for (const { _id, services } of users) {
		const validTokens = services?.resume?.loginTokens?.filter((token) => 'when' in token && token.when >= oldestValidDate) || [];

		void api.broadcast('watch.users', {
			clientAction: 'updated',
			id: _id,
			diff: {
				'services.resume.loginTokens': validTokens,
			},
			unset: {},
		});
	}
}
