import type { IYasChatRecord } from './IYasChatRecord';

export interface ILivechatTag extends IYasChatRecord {
	name: string;
	description?: string;
	numDepartments: number;
	departments: Array<string>;
}

export type FindTagsResult = {
	tags: ILivechatTag[];
	count: number;
	offset: number;
	total: number;
};
