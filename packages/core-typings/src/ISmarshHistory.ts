import type { IYasChatRecord } from './IYasChatRecord';

export interface ISmarshHistory extends IYasChatRecord {
	lastRan: Date;
	lastResult: string;
}
