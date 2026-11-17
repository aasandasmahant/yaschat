import type { IYasChatRecord } from './IYasChatRecord';

export interface ICustomSound extends IYasChatRecord {
	name: string;
	extension: string;
	src?: string;
	random?: unknown;
}
