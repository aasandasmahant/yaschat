import { ClientSafeError } from '@yas chat/core-services';
import { Subscriptions } from '@yas chat/models';

import { notifyOnSubscriptionChangedByRoomIdAndUserId } from '../../lib/notifyListener';

export const hideRoomMethod = async (userId: string, rid: string): Promise<number> => {
	if (!userId) {
		throw new ClientSafeError('error-unauthenticated', 'Unauthenticated', {
			method: 'hideRoom',
		});
	}

	const { modifiedCount } = await Subscriptions.hideByRoomIdAndUserId(rid, userId);

	if (modifiedCount) {
		void notifyOnSubscriptionChangedByRoomIdAndUserId(rid, userId);
	}

	return modifiedCount;
};
