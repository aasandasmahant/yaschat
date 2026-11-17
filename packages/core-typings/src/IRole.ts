import type { IYasChatRecord } from './IYasChatRecord';

export interface IRole extends IYasChatRecord {
	description: string;
	mandatory2fa?: boolean;
	name: string;
	protected: boolean;
	scope: 'Users' | 'Subscriptions';
}
