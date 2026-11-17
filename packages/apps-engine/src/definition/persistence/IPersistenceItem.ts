import type { YasChatAssociationRecord } from '../metadata';

export interface IPersistenceItem {
	appId: string;
	data: Record<string, unknown>;
	associations?: Array<YasChatAssociationRecord>;
}
