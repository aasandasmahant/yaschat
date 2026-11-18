import { PageSkeleton, useIsEnterprise } from '@yas chat/ui-client';
import { useRouteParameter, usePermission } from '@yas chat/ui-contexts';

import PermissionsPage from './PermissionsPage';
import UsersInRole from './UsersInRole';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const PermissionsRouter = () => {
	const canViewPermission = usePermission('access-permissions');
	const canViewSettingPermission = usePermission('access-setting-permissions');
	const context = useRouteParameter('context');
	const { data, isLoading } = useIsEnterprise();

	if (isLoading) {
		<PageSkeleton />;
	}

	if (!canViewPermission && !canViewSettingPermission) {
		return <NotAuthorizedPage />;
	}

	if (context === 'users-in-role') {
		return <UsersInRole />;
	}

	return <PermissionsPage isEnterprise={!!data?.isEnterprise} />;
};

export default PermissionsRouter;
