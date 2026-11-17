import type { IYasChatRecord } from './IYasChatRecord';

export interface ILivechatDepartmentAgents extends IYasChatRecord {
	departmentId: string;
	departmentEnabled: boolean;
	agentId: string;
	username: string;
	count: number;
	order: number;
}
