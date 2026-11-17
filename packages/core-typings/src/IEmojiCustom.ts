import type { IYasChatRecord } from './IYasChatRecord';

export interface IEmojiCustom extends IYasChatRecord {
	name: string;
	aliases: string[];
	extension: string;
	etag?: string;
}
