import type { IYasChatRecord } from './IYasChatRecord';

export interface ILivechatAgentActivity extends IYasChatRecord {
	agentId: string;
	date: number;
	lastStartedAt: Date;
	availableTime: number;
	serviceHistory: IServiceHistory[];
	lastStoppedAt?: Date;
}

export interface IServiceHistory {
	startedAt: Date;
	stoppedAt: Date;
}
