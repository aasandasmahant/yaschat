import type { IYasChatRecord } from './IYasChatRecord';

export interface ILivechatTagRecord extends IYasChatRecord {
	name: string;
	description: string;
	numDepartments: number;
	departments: Array<string>;
}
