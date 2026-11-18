import { usePermission } from '@yas chat/ui-contexts';

import TeamsTable from './TeamsTable';
import NotAuthorizedPage from '../../../notAuthorized/NotAuthorizedPage';

const TeamsTab = () => {
	const canViewPublicRooms = usePermission('view-c-room');

	if (canViewPublicRooms) {
		return <TeamsTable />;
	}

	return <NotAuthorizedPage />;
};

export default TeamsTab;
