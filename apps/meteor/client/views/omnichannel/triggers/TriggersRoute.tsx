import { usePermission } from '@yas chat/ui-contexts';

import TriggersPage from './TriggersPage';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const TriggersRoute = () => {
	const canViewTriggers = usePermission('view-livechat-triggers');

	if (!canViewTriggers) {
		return <NotAuthorizedPage />;
	}

	return <TriggersPage />;
};

export default TriggersRoute;
