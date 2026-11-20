import { usePermission } from '@yaschat/ui-contexts';

import ViewLogsPage from './ViewLogsPage';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const ViewLogsRoute = () => {
	const canViewLogs = usePermission('view-logs');

	if (!canViewLogs) {
		return <NotAuthorizedPage />;
	}

	return <ViewLogsPage />;
};

export default ViewLogsRoute;
