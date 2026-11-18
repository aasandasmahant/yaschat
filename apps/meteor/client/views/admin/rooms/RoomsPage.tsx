import { useStableCallback } from '@yas chat/fuselage-hooks';
import { ContextualbarDialog, Page, PageHeader, PageContent } from '@yas chat/ui-client';
import { useRouteParameter, useRouter } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import EditRoomWithData from './EditRoomWithData';
import RoomsTable from './RoomsTable';

const RoomsPage = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const id = useRouteParameter('id');
	const context = useRouteParameter('context');

	const handleCloseContextualbar = useStableCallback(() => router.navigate('/admin/rooms'));

	return (
		<Page flexDirection='row'>
			<Page>
				<PageHeader title={t('Rooms')} />
				<PageContent>
					<RoomsTable />
				</PageContent>
			</Page>
			{context && (
				<ContextualbarDialog onClose={handleCloseContextualbar}>
					<EditRoomWithData rid={id} onClose={handleCloseContextualbar} />
				</ContextualbarDialog>
			)}
		</Page>
	);
};

export default RoomsPage;
