import type { IYasChatRecord } from './IYasChatRecord';

export const DEFAULT_SLA_CONFIG = {
	ESTIMATED_WAITING_TIME_QUEUE: 9999999,
};

export interface IOmnichannelServiceLevelAgreements extends IYasChatRecord {
	name: string;
	description?: string;
	dueTimeInMinutes: number;
}
