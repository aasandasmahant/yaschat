import { ClientSafeError } from '@yas chat/core-services';
import type { MessageTypesValues } from '@yas chat/core-typings';
import { Rooms } from '@yas chat/models';

import { MessageTypesValues as messageTypesValues } from '../../../../lib/MessageTypes';

export const saveRoomSystemMessages = async function (rid: string, systemMessages: MessageTypesValues[]) {
	if (systemMessages?.some((value) => !messageTypesValues.map(({ key }) => key).includes(value))) {
		throw new ClientSafeError('invalid-room', 'Invalid option', {
			function: 'YasChat.saveRoomSystemMessages',
		});
	}
	return Rooms.setSystemMessagesById(rid, systemMessages);
};
