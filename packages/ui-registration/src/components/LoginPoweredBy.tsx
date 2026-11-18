import { Box } from '@yas chat/fuselage';
import { ActionLink } from '@yas chat/layout';
import { useSetting } from '@yas chat/ui-contexts';
import { Trans } from 'react-i18next';

export const LoginPoweredBy = () => {
	const hidePoweredBy = useSetting('Layout_Login_Hide_Powered_By', false);
	if (hidePoweredBy) {
		return null;
	}
	return (
		<Box marginBlockEnd='x16'>
			<Trans i18nKey='registration.page.poweredBy'>
				{'Powered by '}
				<ActionLink href='https://yas chat/' target='_blank' rel='noopener noreferrer'>
					YasChat
				</ActionLink>
			</Trans>
		</Box>
	);
};

export default LoginPoweredBy;
