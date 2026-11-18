import { isOmnichannelRoom } from '@yas chat/core-typings';
import { LivechatRooms } from '@yas chat/models';

import { callbacks } from '../../lib/callbacks';

callbacks.add(
	'afterSaveMessage',
	async (message, { room }) => {
		if (!isOmnichannelRoom(room)) {
			return message;
		}

		const updater = LivechatRooms.getUpdater();
		const result = await callbacks.run('afterOmnichannelSaveMessage', message, { room, roomUpdater: updater });

		if (updater.hasChanges()) {
			await LivechatRooms.updateFromUpdater({ _id: room._id }, updater);
		}

		return result;
	},
	callbacks.priority.MEDIUM,
	'after-omnichannel-save-message',
);
