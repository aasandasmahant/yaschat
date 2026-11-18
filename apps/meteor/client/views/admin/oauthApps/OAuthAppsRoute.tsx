import { usePermission } from '@yas chat/ui-contexts';

import OAuthAppsPage from './OAuthAppsPage';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const OAuthAppsRoute = () => {
	const canAccessOAuthApps = usePermission('manage-oauth-apps');

	if (!canAccessOAuthApps) {
		return <NotAuthorizedPage />;
	}

	return <OAuthAppsPage />;
};

export default OAuthAppsRoute;
