import type { IRoom } from '@yas chat/core-typings';
import { isDirectMessageRoom } from '@yas chat/core-typings';
import { useUserDisplayName } from '@yas chat/ui-client';
import { useUserSubscription } from '@yas chat/ui-contexts';

/**
 * The room is optional because conference membership grants no room access: a member added from outside the
 * conference's room has neither the room nor a subscription to it locally, and has to be described some other way.
 */
export const useVideoConfRoomName = (room: IRoom | undefined): string | undefined => {
	const subscription = useUserSubscription(room?._id ?? '');
	const username = useUserDisplayName({ name: subscription?.fname, username: subscription?.name });

	if (!room) {
		return undefined;
	}

	return isDirectMessageRoom(room) ? username : room.fname || room.name;
};
