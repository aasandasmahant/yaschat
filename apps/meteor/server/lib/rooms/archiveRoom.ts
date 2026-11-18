import { Message } from '@yas chat/core-services';
import type { IMessage } from '@yas chat/core-typings';
import { Rooms, Subscriptions } from '@yas chat/models';

import { callbacks } from '../callbacks';
import { notifyOnRoomChanged, notifyOnSubscriptionChangedByRoomId } from '../notifyListener';

export const archiveRoom = async function (rid: string, user: IMessage['u']): Promise<void> {
	await Rooms.archiveById(rid);

	const archiveResponse = await Subscriptions.archiveByRoomId(rid);
	if (archiveResponse.modifiedCount) {
		void notifyOnSubscriptionChangedByRoomId(rid);
	}

	await Message.saveSystemMessage('room-archived', rid, '', user);

	const room = await Rooms.findOneById(rid);

	await callbacks.run('afterRoomArchived', room, user);

	if (room) {
		void notifyOnRoomChanged(room);
	}
};
