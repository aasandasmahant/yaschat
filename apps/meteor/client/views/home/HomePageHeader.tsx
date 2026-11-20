import { Button } from '@yaschat/fuselage';
import { PageHeader } from '@yaschat/ui-client';
import { useSetting, useAllPermissions, useRoute } from '@yaschat/ui-contexts';
import { useTranslation } from 'react-i18next';

const EDIT_LAYOUT_PERMISSIONS = ['view-privileged-setting', 'edit-privileged-setting', 'manage-selected-settings'];

const HomepageHeader = () => {
	const { t } = useTranslation();
	const title = useSetting('Layout_Home_Title', 'Home');
	const canEditLayout = useAllPermissions(EDIT_LAYOUT_PERMISSIONS);
	const settingsRoute = useRoute('admin-settings');

	return (
		<PageHeader title={title}>
			{canEditLayout && (
				<Button icon='pencil' onClick={() => settingsRoute.push({ group: 'Layout' })}>
					{t('Customize')}
				</Button>
			)}
		</PageHeader>
	);
};

export default HomepageHeader;
