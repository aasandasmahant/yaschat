import type { IYasChatRecord } from './IYasChatRecord';

export interface ILivechatUnitMonitor extends IYasChatRecord {
	monitorId: string;
	unitId: string;
	username: string;
}
