import type { IYasChatRecord } from './IYasChatRecord';

export interface ICredentialToken extends IYasChatRecord {
	userInfo: {
		username?: string;
		attributes?: any;
		profile?: Record<string, any>;
	};
	expireAt: Date;
}
