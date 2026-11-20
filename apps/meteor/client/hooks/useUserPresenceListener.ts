import { UserStatus } from '@yaschat/core-typings';
import { useStreamAll } from '@yaschat/ui-contexts';
import { useEffect } from 'react';

import { Presence } from '../lib/presence';

const STATUS_MAP = [UserStatus.OFFLINE, UserStatus.ONLINE, UserStatus.AWAY, UserStatus.BUSY, UserStatus.DISABLED];

export const useUserPresenceListener = (): void => {
	const subscribe = useStreamAll('user-presence');

	useEffect(
		() =>
			subscribe((uid, [[username, statusChanged, statusText, statusSource, statusExpiresAt]]) => {
				Presence.notify({
					_id: uid,
					username,
					status: STATUS_MAP[statusChanged as any],
					statusText,
					statusSource,
					statusExpiresAt,
				});
			}),
		[subscribe],
	);
};
