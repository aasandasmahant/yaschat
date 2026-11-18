import { Page, PageHeader, PageContent } from '@yas chat/ui-client';
import { usePermission } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import ManagersTable from './ManagersTable';
import NotAuthorizedPage from '../../notAuthorized/NotAuthorizedPage';

const ManagersRoute = () => {
	const { t } = useTranslation();
	const canViewManagers = usePermission('manage-livechat-managers');

	if (!canViewManagers) {
		return <NotAuthorizedPage />;
	}

	return (
		<Page flexDirection='row'>
			<Page>
				<PageHeader title={t('Managers')} />
				<PageContent>
					<ManagersTable />
				</PageContent>
			</Page>
		</Page>
	);
};

export default ManagersRoute;
