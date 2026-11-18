import type { IPersistenceRead } from '@yas chat/apps-engine/definition/accessors';
import type { YasChatAssociationRecord } from '@yas chat/apps-engine/definition/metadata';

import { bridgeCall } from '../../bridges/bridgeCall';
import type * as Messenger from '../../messenger';

export class PersistenceRead implements IPersistenceRead {
	constructor(private readonly senderFn: typeof Messenger.sendRequest) {}

	public read(id: string): Promise<object> {
		return bridgeCall<object>(this.senderFn, 'getPersistenceBridge', 'doReadById', id, 'APP_ID');
	}

	public readByAssociation(association: YasChatAssociationRecord): Promise<Array<object>> {
		return bridgeCall<Array<object>>(this.senderFn, 'getPersistenceBridge', 'doReadByAssociations', new Array(association), 'APP_ID');
	}

	public readByAssociations(associations: Array<YasChatAssociationRecord>): Promise<Array<object>> {
		return bridgeCall<Array<object>>(this.senderFn, 'getPersistenceBridge', 'doReadByAssociations', associations, 'APP_ID');
	}
}
