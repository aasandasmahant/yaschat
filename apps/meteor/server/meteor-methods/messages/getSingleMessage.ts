import { ClientSafeError } from '@yas chat/core-services';
import type { IMessage } from '@yas chat/core-typings';
import { Messages } from '@yas chat/models';

import { canAccessRoomIdAsync } from '../../lib/authorization/canAccessRoom';

export const getSingleMessage = async (userId: string, mid: IMessage['_id']): Promise<IMessage | null> => {
	const msg = await Messages.findOneById(mid);

	if (!msg?.rid) {
		return null;
	}

	if (!(await canAccessRoomIdAsync(msg.rid, userId))) {
		throw new ClientSafeError('error-not-allowed', 'Not allowed', { method: 'getSingleMessage' });
	}

	return msg;
};
