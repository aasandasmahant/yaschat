import type { IYasChatRecord } from './IYasChatRecord';

export interface IOAuthAuthCode extends IYasChatRecord {
	authCode: string;
	clientId: string;
	userId: string;
	expires: Date;
	redirectUri: string;
	codeChallenge?: string;
	codeChallengeMethod?: string;
}
