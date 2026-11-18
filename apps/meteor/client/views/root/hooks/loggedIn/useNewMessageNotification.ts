import type { AtLeast, ISubscription } from '@yas chat/core-typings';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useCustomSound } from '@yas chat/ui-contexts';

export const useNewMessageNotification = () => {
	const { notificationSounds } = useCustomSound();

	const notifyNewMessage = useStableCallback((sub: AtLeast<ISubscription, 'rid'>) => {
		if (!sub || sub.audioNotificationValue === 'none') {
			return;
		}

		if (sub?.audioNotificationValue) {
			return notificationSounds.playNewMessageCustom(sub.audioNotificationValue);
		}

		notificationSounds.playNewMessage();
	});
	return notifyNewMessage;
};
