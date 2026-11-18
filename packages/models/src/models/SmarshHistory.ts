import type { ISmarshHistory, YasChatRecordDeleted } from '@yas chat/core-typings';
import type { ISmarshHistoryModel } from '@yas chat/model-typings';
import type { Db, Collection } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class SmarshHistoryRaw extends BaseRaw<ISmarshHistory> implements ISmarshHistoryModel {
	constructor(db: Db, trash?: Collection<YasChatRecordDeleted<ISmarshHistory>>) {
		super(db, 'smarsh_history', trash);
	}
}
