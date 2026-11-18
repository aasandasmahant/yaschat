import { generateStampedLoginToken, hashStampedToken } from '@yas chat/account-utils';
import type { StampedLoginToken } from '@yas chat/account-utils';
import type { IUser } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';

export async function issueLoginToken(userId: IUser['_id']): Promise<StampedLoginToken> {
	const stampedToken = generateStampedLoginToken();
	await Users.addLoginToken(userId, hashStampedToken(stampedToken));

	return stampedToken;
}
