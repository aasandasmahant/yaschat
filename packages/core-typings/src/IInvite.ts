import type { IYasChatRecord } from './IYasChatRecord';

export interface IInvite extends IYasChatRecord {
	days: number;
	maxUses: number;
	rid: string;
	userId: string;
	createdAt: Date;
	expires: Date | null;
	uses: number;
	url: string;
}
