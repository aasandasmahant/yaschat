import type { IRoom } from '@yaschat/core-typings';
import { isDirectMessageRoom } from '@yaschat/core-typings';
import { useUserDisplayName } from '@yaschat/ui-client';
import { useUserSubscription } from '@yaschat/ui-contexts';

/**
 *
 * Hook to get the name of the room
 *
 * @param room - Room object
 * @returns Room name
 * @public
 *
 */
export const useRoomName = (room: IRoom) => {
	const subscription = useUserSubscription(room._id);
	const username = useUserDisplayName({ name: subscription?.fname, username: subscription?.name });

	if (isDirectMessageRoom(room)) {
		return username;
	}

	return room.fname || room.name;
};
