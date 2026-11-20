import type { IUser } from '@yaschat/core-typings';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useConnectionStatus, useSetting } from '@yaschat/ui-contexts';

import { useIdleActiveEvents } from './useIdleActiveEvents';

export const useIdleConnection = (uid: IUser['_id'] | undefined) => {
	const { status } = useConnectionStatus();
	const allowAnonymousRead = useSetting('Accounts_AllowAnonymousRead');
	const { disconnect: disconnectServer, reconnect: reconnectServer } = useConnectionStatus();

	const disconnect = useStableCallback(() => {
		if (status !== 'offline') {
			if (!uid && allowAnonymousRead !== true) {
				disconnectServer();
			}
		}
	});

	const reconnect = useStableCallback(() => {
		if (status === 'offline') {
			reconnectServer();
		}
	});

	useIdleActiveEvents({ id: 'useLoginPresence', time: 60 * 1000 }, disconnect, reconnect);
};
