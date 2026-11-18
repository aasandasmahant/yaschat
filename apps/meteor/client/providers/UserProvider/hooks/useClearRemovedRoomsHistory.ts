import type { IUser } from '@yas chat/core-typings';
import { useStream } from '@yas chat/ui-contexts';
import { useEffect } from 'react';

import { RoomHistoryManager } from '../../../lib/RoomHistoryManager';

export const useClearRemovedRoomsHistory = (userId: IUser['_id'] | undefined) => {
	const subscribeToNotifyUser = useStream('notify-user');
	useEffect(() => {
		if (!userId) {
			return;
		}

		return subscribeToNotifyUser(`${userId}/subscriptions-changed`, (event, data) => {
			if (data.t !== 'l' && event === 'removed' && data.rid) {
				RoomHistoryManager.clear(data.rid);
			}
		});
	}, [userId, subscribeToNotifyUser]);
};
