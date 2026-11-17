import type { IYasChatRecord } from './IYasChatRecord';

export interface IOEmbedCache extends IYasChatRecord {
	data: any;
	updatedAt: Date; // TODO: this field name differs from `_updatedAt` on `IYasChatRecord`, should we unify this?
}
