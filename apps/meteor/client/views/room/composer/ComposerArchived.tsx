import { MessageFooterCallout, MessageFooterCalloutContent } from '@yas chat/ui-composer';
import { useTranslation } from 'react-i18next';

const ComposerReadOnly = () => {
	const { t } = useTranslation();

	return (
		<MessageFooterCallout>
			<MessageFooterCalloutContent>{t('Room_archived')}</MessageFooterCalloutContent>
		</MessageFooterCallout>
	);
};

export default ComposerReadOnly;
