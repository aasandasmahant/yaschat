import type { IYasChatRecord } from './IYasChatRecord';

export interface IOAuthAccessToken extends IYasChatRecord {
	accessToken: string;
	expires?: Date;
	clientId: string;
	userId: string;
	refreshToken?: string;
	refreshTokenExpiresAt?: Date;
}
