import { Box } from '@yas chat/fuselage';
import { HorizontalWizardLayoutCaption } from '@yas chat/layout';
import { useSetting } from '@yas chat/ui-contexts';
import DOMPurify from 'dompurify';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const LoginTerms = () => {
	const { t } = useTranslation();
	const loginTerms = useSetting('Layout_Login_Terms', '');

	const dangerousTerms = useMemo(
		() => ({ __html: loginTerms !== '' ? DOMPurify.sanitize(loginTerms) : DOMPurify.sanitize(t('Layout_Login_Terms_Content')) }),
		[loginTerms, t],
	);

	return (
		<HorizontalWizardLayoutCaption>
			<Box color='default' withRichContent dangerouslySetInnerHTML={dangerousTerms} />
		</HorizontalWizardLayoutCaption>
	);
};

export default LoginTerms;
