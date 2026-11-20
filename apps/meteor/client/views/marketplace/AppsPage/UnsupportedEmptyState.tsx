import { Box, States, StatesIcon, StatesTitle, StatesSubtitle, StatesActions, Button } from '@yaschat/fuselage';
import { links } from '@yaschat/ui-client';
import { usePermission } from '@yaschat/ui-contexts';
import { useTranslation } from 'react-i18next';

import UpdateYasChatButton from '../components/UpdateYasChatButton';

const UnsupportedEmptyState = () => {
	const isAdmin = usePermission('manage-apps');
	const { t } = useTranslation();

	const title = isAdmin ? t('Update_to_access_marketplace') : t('Marketplace_unavailable');
	const description = isAdmin ? t('Update_to_access_marketplace_description') : t('Marketplace_unavailable_description');

	return (
		<Box marginBlockStart={64}>
			<States>
				<StatesIcon name='warning' />
				<StatesTitle>{title}</StatesTitle>
				<StatesSubtitle>{description}</StatesSubtitle>
				<StatesActions>
					<Button variant='secondary' is='a' href={links.go.supportPrerequisites} external>
						{t('Learn_more')}
					</Button>
					{isAdmin && <UpdateYasChatButton />}
				</StatesActions>
			</States>
		</Box>
	);
};

export default UnsupportedEmptyState;
