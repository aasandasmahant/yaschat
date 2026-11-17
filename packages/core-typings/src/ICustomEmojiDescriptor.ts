import type { IYasChatRecord } from './IYasChatRecord';

export interface ICustomEmojiDescriptor extends IYasChatRecord {
	name: string;
	aliases: string;
	extension: string;
}
