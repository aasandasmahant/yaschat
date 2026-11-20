import type { AtLeast, ISubscription } from '@yaschat/core-typings';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useCustomSound } from '@yaschat/ui-contexts';

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
