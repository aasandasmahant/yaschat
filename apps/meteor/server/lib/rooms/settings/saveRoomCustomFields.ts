import { ClientSafeError } from '@yas chat/core-services';
import { Rooms, Subscriptions } from '@yas chat/models';
import { isRecord } from '@yas chat/tools';
import type { UpdateResult } from 'mongodb';

import { notifyOnSubscriptionChangedByRoomId } from '../../notifyListener';

export const saveRoomCustomFields = async function (rid: string, roomCustomFields: Record<string, any>): Promise<UpdateResult> {
	if (!isRecord(roomCustomFields)) {
		throw new ClientSafeError('invalid-roomCustomFields-type', 'Invalid roomCustomFields type', {
			function: 'YasChat.saveRoomCustomFields',
		});
	}

	const ret = await Rooms.setCustomFieldsById(rid, roomCustomFields);

	// Update customFields of any user's Subscription related with this rid
	const { modifiedCount } = await Subscriptions.updateCustomFieldsByRoomId(rid, roomCustomFields);
	if (modifiedCount) {
		void notifyOnSubscriptionChangedByRoomId(rid);
	}

	return ret;
};
