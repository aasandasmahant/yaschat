import type { IYasChatRecord } from './IYasChatRecord';

export interface IEmailMessageHistory extends IYasChatRecord {
	email: string;
	createdAt?: Date;
}
