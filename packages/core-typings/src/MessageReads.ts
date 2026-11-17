import type { IMessage } from './IMessage/IMessage';
import type { IYasChatRecord } from './IYasChatRecord';
import type { IUser } from './IUser';

export interface MessageReads extends IYasChatRecord {
	tmid: IMessage['_id'];
	ls: Date;
	userId: IUser['_id'];
}
