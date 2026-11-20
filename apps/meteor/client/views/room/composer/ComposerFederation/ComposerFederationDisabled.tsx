import { MessageFooterCallout } from '@yaschat/ui-composer';
import { useTranslation } from 'react-i18next';

const ComposerFederationDisabled = () => {
	const { t } = useTranslation();

	return <MessageFooterCallout>{t('Federation_Matrix_Federated_Description_disabled')}</MessageFooterCallout>;
};

export default ComposerFederationDisabled;
