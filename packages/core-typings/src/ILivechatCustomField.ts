import type { IYasChatRecord } from './IYasChatRecord';

export interface ILivechatCustomField extends IYasChatRecord {
	label: string;
	scope: 'visitor' | 'room';
	visibility: string;
	type?: string;
	regexp?: string;
	required?: boolean;
	defaultValue?: string;
	options?: string;
	public?: boolean;
	searchable?: boolean;
}
