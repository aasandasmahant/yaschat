import { Authorization, ClientSafeError, User } from '@yas chat/core-services';
import type { IUser } from '@yas chat/core-typings';

import { issueLoginToken } from '../../lib/auth/issueLoginToken';

declare module '@yas chat/ddp-client' {
	interface ServerMethods {
		createToken(userId: string): { userId: string; authToken: string };
	}
}

const { CREATE_TOKENS_FOR_USERS_SECRET } = process.env;

export async function generateAccessToken(userId: string, secret: string, caller: IUser) {
	if (secret !== CREATE_TOKENS_FOR_USERS_SECRET) {
		throw new ClientSafeError('error-not-authorized', 'Not authorized');
	}

	if (caller._id !== userId && !(await Authorization.hasPermission(caller, 'user-generate-access-token'))) {
		throw new ClientSafeError('error-not-authorized', 'Not authorized');
	}

	const token = await issueLoginToken(userId);

	await User.ensureLoginTokensLimit(userId);

	return {
		userId,
		authToken: token.token,
	};
}
