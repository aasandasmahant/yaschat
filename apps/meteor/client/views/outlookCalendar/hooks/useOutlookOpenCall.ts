import { useUserDisplayName } from '@yas chat/ui-client';
import { useUser } from '@yas chat/ui-contexts';

import { useVideoConfOpenCall } from '../../room/contextualBar/VideoConference/hooks/useVideoConfOpenCall';

export const useOutlookOpenCall = (meetingUrl?: string | null) => {
	const user = useUser();
	const handleOpenCall = useVideoConfOpenCall();
	const userDisplayName = useUserDisplayName({ name: user?.name, username: user?.username });

	const namedMeetingUrl = `${meetingUrl}&name=${userDisplayName}`;

	if (!meetingUrl) {
		return;
	}

	// Discards the window it returns: nothing here watches a call it didn't start.
	return () => void handleOpenCall(namedMeetingUrl);
};
