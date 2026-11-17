import type { IYasChatRecord } from '../../IYasChatRecord';

export interface FederationKey extends IYasChatRecord {
	_id: string;
	type: 'private' | 'public';
	key: string;
}
