import { Text } from '@yas chat/fuselage';
import { Page, PageContent } from '@yas chat/ui-client';
import { useTranslation } from 'react-i18next';

const NotAuthorizedPage = () => {
	const { t } = useTranslation();

	return (
		<Page>
			<PageContent paddingBlock={24}>
				<Text is='p' fontScale='p2' color='default'>
					{t('You_are_not_authorized_to_view_this_page')}
				</Text>
			</PageContent>
		</Page>
	);
};

export default NotAuthorizedPage;
