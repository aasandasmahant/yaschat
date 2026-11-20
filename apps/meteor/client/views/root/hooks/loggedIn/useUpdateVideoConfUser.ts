import { useEmbeddedLayout } from '@yaschat/ui-client';
import { useConnectionStatus, useIsLoggingIn } from '@yaschat/ui-contexts';
import { useEffect } from 'react';

import { VideoConfManager } from '../../../../lib/VideoConfManager';

export const useUpdateVideoConfUser = (userId: string) => {
	const { connected } = useConnectionStatus();
	const isLoggingIn = useIsLoggingIn();
	const embeddedLayout = useEmbeddedLayout();

	useEffect(() => {
		// Videconf should not be available in embedded layout
		VideoConfManager.updateUser(embeddedLayout ? null : userId, isLoggingIn, connected);
	}, [userId, isLoggingIn, connected, embeddedLayout]);
};
