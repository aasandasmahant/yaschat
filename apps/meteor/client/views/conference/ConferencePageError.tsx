import { States, StatesIcon, StatesTitle, StatesSubtitle, StatesActions, StatesAction } from '@yas chat/fuselage';
import { Page, PageHeader, PageContent } from '@yas chat/ui-client';
import { useUser, useRoute } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

const ConferencePageError = () => {
	const { t } = useTranslation();
	const user = useUser();
	const route = useRoute('login');

	return (
		<Page background='tint'>
			<PageHeader title={t('Video_Conference')} />
			<PageContent>
				<States>
					<StatesIcon name='circle-exclamation' variation='danger' />
					<StatesTitle>{t('Call_not_found')}</StatesTitle>
					<StatesSubtitle>{t('Call_not_found_error')}</StatesSubtitle>
					{!user && (
						<StatesActions>
							<StatesAction onClick={() => route.push()}>{t('Back_to_login')}</StatesAction>
						</StatesActions>
					)}
				</States>
			</PageContent>
		</Page>
	);
};

export default ConferencePageError;
