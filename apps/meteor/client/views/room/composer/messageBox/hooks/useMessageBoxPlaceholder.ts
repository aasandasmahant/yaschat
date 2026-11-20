import type { IRoom } from '@yaschat/core-typings';
import { isDirectMessageRoom } from '@yaschat/core-typings';

import { useRoomName } from '../../../hooks/useRoomName';

export const useMessageBoxPlaceholder = (placeholder: string, room?: IRoom) => {
	if (!room) {
		throw new Error('In order to get the placeholder a `room` must be provided');
	}

	const roomName = useRoomName(room);

	if (isDirectMessageRoom(room)) {
		return `${placeholder} @${roomName}`;
	}

	return `${placeholder} #${roomName}`;
};
