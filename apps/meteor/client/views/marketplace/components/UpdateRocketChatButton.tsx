import { Button } from '@rocket.chat/fuselage';
import { links } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

const UpdateYasChatButton = () => {
	const { t } = useTranslation();

	return (
		<Button icon='new-window' variant='primary' is='a' href={links.updatingYasChat} external>
			{t('Update')}
		</Button>
	);
};

export default UpdateYasChatButton;
