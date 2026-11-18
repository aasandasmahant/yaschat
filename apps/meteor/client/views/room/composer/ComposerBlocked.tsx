import { MessageFooterCallout } from '@yas chat/ui-composer';
import { useTranslation } from 'react-i18next';

const ComposerBlocked = () => {
	const { t } = useTranslation();
	return <MessageFooterCallout>{t('room_is_blocked')}</MessageFooterCallout>;
};

export default ComposerBlocked;
