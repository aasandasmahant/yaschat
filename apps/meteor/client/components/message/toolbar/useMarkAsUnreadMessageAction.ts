import { isOmnichannelRoom } from '@yaschat/core-typings';
import type { ISubscription, IMessage, IRoom } from '@yaschat/core-typings';
import { useRouter, useUser } from '@yaschat/ui-contexts';

import type { MessageActionConfig } from '../../../lib/MessageAction';
import { useMarkAsUnreadMutation } from '../hooks/useMarkAsUnreadMutation';

export const useMarkAsUnreadMessageAction = (
	message: IMessage,
	{ room, subscription }: { room: IRoom; subscription: ISubscription | undefined },
): MessageActionConfig | null => {
	const user = useUser();
	const { mutateAsync: markAsUnread } = useMarkAsUnreadMutation();

	const router = useRouter();

	if (isOmnichannelRoom(room) || !user) {
		return null;
	}

	if (!subscription) {
		return null;
	}

	if (message.u._id === user._id) {
		return null;
	}

	return {
		id: 'mark-message-as-unread',
		icon: 'flag',
		label: 'Mark_unread',
		context: ['message', 'message-mobile', 'threads', 'federated'],
		type: 'interaction',
		async action() {
			router.navigate('/home');
			await markAsUnread({ message, subscription });
		},
		order: 4,
		group: 'menu',
	};
};
