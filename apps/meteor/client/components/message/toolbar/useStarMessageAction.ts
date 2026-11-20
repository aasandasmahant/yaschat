import type { IMessage, IRoom } from '@yaschat/core-typings';
import { isOmnichannelRoom } from '@yaschat/core-typings';
import { useSetting, useUser } from '@yaschat/ui-contexts';

import type { MessageActionConfig } from '../../../lib/MessageAction';
import { useStarMessageMutation } from '../hooks/useStarMessageMutation';

export const useStarMessageAction = (message: IMessage, { room }: { room: IRoom }): MessageActionConfig | null => {
	const user = useUser();
	const allowStarring = useSetting('Message_AllowStarring', true);

	const { mutateAsync: starMessage } = useStarMessageMutation();

	if (!allowStarring || isOmnichannelRoom(room)) {
		return null;
	}

	if (Array.isArray(message.starred) && message.starred.some((star) => star._id === user?._id)) {
		return null;
	}

	return {
		id: 'star-message',
		icon: 'star',
		label: 'Star',
		type: 'interaction',
		context: ['starred', 'message', 'message-mobile', 'threads', 'federated', 'videoconf', 'videoconf-threads'],
		async action() {
			await starMessage(message);
		},
		order: 3,
		group: 'menu',
	};
};
