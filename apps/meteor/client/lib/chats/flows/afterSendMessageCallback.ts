import type { IMessage } from '@yaschat/core-typings';
import { clientCallbacks } from '@yaschat/ui-client';

import { Rooms } from '../../../stores';
import { getUser } from '../../user';

export const afterSendMessageCallback = async (message: IMessage, rid: string) => {
	const user = getUser();
	const room = Rooms.state.get(rid);

	if (!room || !user) {
		return;
	}

	const processedMessage = {
		...message,
		u: {
			_id: user?._id,
			username: user?.username,
			name: user?.name || '',
		},
	};
	await clientCallbacks.run('afterSaveMessage', processedMessage, { room, user });
};
