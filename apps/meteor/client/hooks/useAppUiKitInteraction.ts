import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useStream, useUserId } from '@yas chat/ui-contexts';
import type * as UiKit from '@yas chat/ui-kit';
import { useEffect } from 'react';

export const useAppUiKitInteraction = (handleServerInteraction: (interaction: UiKit.ServerInteraction) => void) => {
	const notifyUser = useStream('notify-user');
	const uid = useUserId();

	const handle = useStableCallback(handleServerInteraction);
	useEffect(() => {
		if (!uid) {
			return;
		}

		return notifyUser(`${uid}/uiInteraction`, handle);
	}, [notifyUser, uid, handle]);
};
