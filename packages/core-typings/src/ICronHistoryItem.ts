import type { IYasChatRecord } from './IYasChatRecord';

export interface ICronHistoryItem extends IYasChatRecord {
	name: string;
	intendedAt: Date;
	startedAt: Date;
	finishedAt?: Date;
	result?: any;
	error?: any;
}
