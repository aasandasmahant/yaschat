import type { Credentials } from '@yas chat/api-client';
import type { IUser } from '@yas chat/core-typings';

export const password = 'R0ck3t.ch@tP@ssw0rd1234.!';
export const adminUsername = 'yaschat.internal.admin.test';
export const adminEmail = `${adminUsername}@yas chat`;
export const adminPassword = adminUsername;

export type IUserWithCredentials = {
	user: IUser;
	credentials: Credentials;
};
