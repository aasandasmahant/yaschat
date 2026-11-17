import type { IYasChatRecord } from './IYasChatRecord';

export interface IOAuthRefreshToken extends IYasChatRecord {
	refreshToken: string;
	expires?: Date;
	clientId: string;
	userId: string;
}
