import { Button } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { ContextualbarDialog, Page, PageHeader, PageContent } from '@yas chat/ui-client';
import { useRouteParameter, useRouter } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import CustomFieldsTable from './CustomFieldsTable';
import EditCustomFields from './EditCustomFields';
import EditCustomFieldsWithData from './EditCustomFieldsWithData';

const CustomFieldsPage = () => {
	const { t } = useTranslation();
	const router = useRouter();

	const context = useRouteParameter('context');
	const id = useRouteParameter('id');

	const handleCloseContextualbar = useStableCallback(() => router.navigate('/omnichannel/customfields'));

	return (
		<Page flexDirection='row'>
			<Page>
				<PageHeader title={t('Custom_Fields')}>
					<Button onClick={() => router.navigate('/omnichannel/customfields/new')}>{t('Create_custom_field')}</Button>
				</PageHeader>
				<PageContent>
					<CustomFieldsTable />
				</PageContent>
			</Page>
			{context && (
				<ContextualbarDialog onClose={handleCloseContextualbar}>
					{context === 'edit' && id && <EditCustomFieldsWithData customFieldId={id} onClose={handleCloseContextualbar} />}
					{context === 'new' && <EditCustomFields onClose={handleCloseContextualbar} />}
				</ContextualbarDialog>
			)}
		</Page>
	);
};

export default CustomFieldsPage;
