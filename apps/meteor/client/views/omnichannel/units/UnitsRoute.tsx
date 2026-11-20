import { useHasLicenseModule } from '@yaschat/ui-client';
import { usePermission } from '@yaschat/ui-contexts';

import UnitsPage from './UnitsPage';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const UnitsRoute = () => {
	const canViewUnits = usePermission('manage-livechat-units');
	const { data: isEnterprise = false } = useHasLicenseModule('livechat-enterprise');

	if (!(isEnterprise && canViewUnits)) {
		return <NotAuthorizedPage />;
	}

	return <UnitsPage />;
};

export default UnitsRoute;
