import { PersonalAccessTokensPage } from '@yas chat/ui-account';
import { usePermission } from '@yas chat/ui-contexts';

import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const AccountTokensRoute = () => {
	const canCreateTokens = usePermission('create-personal-access-tokens');

	if (!canCreateTokens) {
		return <NotAuthorizedPage />;
	}

	return <PersonalAccessTokensPage />;
};

export default AccountTokensRoute;
