import { useUserPreference } from '@yas chat/ui-contexts';
import { useEffect } from 'react';

import { callDesktopBridge } from '../../../../lib/utils/callDesktopBridge';

/** Keeps the desktop app's badge in line with the user's unread alert preference. */
export const useDesktopUnreadAlert = () => {
	const enabled = useUserPreference<boolean>('unreadAlert') !== false;

	useEffect(() => {
		callDesktopBridge((desktop) => desktop.setUnreadAlertEnabled?.(enabled));
	}, [enabled]);
};
