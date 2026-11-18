import type { IAppsModel } from '@yas chat/model-typings';
import type { Db } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class AppsModel extends BaseRaw<any> implements IAppsModel {
	constructor(db: Db) {
		super(db, 'apps');
	}
}
