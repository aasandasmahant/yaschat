import { Button, ButtonGroup } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { ContextualbarDialog, Page, PageHeader, PageContent } from '@yas chat/ui-client';
import { useRouteParameter, useRouter } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import UnitEdit from './UnitEdit';
import UnitEditWithData from './UnitEditWithData';
import UnitsTable from './UnitsTable';

const UnitsPage = () => {
	const { t } = useTranslation();
	const router = useRouter();

	const context = useRouteParameter('context');
	const id = useRouteParameter('id');

	const handleCloseContextualbar = useStableCallback(() => router.navigate('/omnichannel/units'));

	return (
		<Page flexDirection='row'>
			<Page>
				<PageHeader title={t('Units')}>
					<ButtonGroup>
						<Button onClick={() => router.navigate('/omnichannel/units/new')} title={t('New_Unit')}>
							{t('Create_unit')}
						</Button>
					</ButtonGroup>
				</PageHeader>
				<PageContent>
					<UnitsTable />
				</PageContent>
			</Page>
			{context && (
				<ContextualbarDialog onClose={handleCloseContextualbar}>
					{context === 'edit' && id && <UnitEditWithData unitId={id} onClose={handleCloseContextualbar} />}
					{context === 'new' && <UnitEdit onClose={handleCloseContextualbar} />}
				</ContextualbarDialog>
			)}
		</Page>
	);
};

export default UnitsPage;
