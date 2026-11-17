import type { IYasChatRecord } from '../IYasChatRecord';

export interface IControl extends IYasChatRecord {
	version: number;
	locked: boolean;
	hash?: string;
	buildAt?: string | Date;
	lockedAt?: string | Date;
}
