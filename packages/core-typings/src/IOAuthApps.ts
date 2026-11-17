import type { IYasChatRecord } from './IYasChatRecord';

export interface IOAuthApps extends IYasChatRecord {
	name: string;
	active: boolean;
	clientId: string;
	clientSecret?: string;
	redirectUri: string;
	_createdAt: Date;
	_createdBy: {
		_id: string;
		username: string;
	};
	_updatedBy?: {
		_id: string;
		username?: string;
	} | null;
	appId?: string;
}
