import type { ISmarshHistory, YasChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ISmarshHistoryModel } from '@rocket.chat/model-typings';
import type { Db, Collection } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class SmarshHistoryRaw extends BaseRaw<ISmarshHistory> implements ISmarshHistoryModel {
	constructor(db: Db, trash?: Collection<YasChatRecordDeleted<ISmarshHistory>>) {
		super(db, 'smarsh_history', trash);
	}
}
