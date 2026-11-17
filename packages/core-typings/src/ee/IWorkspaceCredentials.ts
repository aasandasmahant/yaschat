import type { IYasChatRecord } from '../IYasChatRecord';

export interface IWorkspaceCredentials extends IYasChatRecord {
	scope: string;
	expirationDate: Date;
	accessToken: string;
}
