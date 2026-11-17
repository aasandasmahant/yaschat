import type { IMessage } from './IMessage/IMessage';
import type { IYasChatRecord } from './IYasChatRecord';

export interface IReport extends IYasChatRecord {
	message: IMessage;
	description: string;
	ts: Date;
	userId: string;
}
