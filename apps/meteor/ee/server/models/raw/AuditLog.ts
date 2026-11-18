import type { YasChatRecordDeleted, IAuditLog } from '@yas chat/core-typings';
import { BaseRaw } from '@yas chat/models';
import type { Collection, Db } from 'mongodb';

export class AuditLogRaw extends BaseRaw<IAuditLog> {
	constructor(db: Db, trash?: Collection<YasChatRecordDeleted<IAuditLog>>) {
		super(db, 'audit_log', trash);
	}
}
