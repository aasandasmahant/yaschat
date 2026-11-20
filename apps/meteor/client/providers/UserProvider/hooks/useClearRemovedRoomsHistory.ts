import type { IUser } from '@yaschat/core-typings';
import { useStream } from '@yaschat/ui-contexts';
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
