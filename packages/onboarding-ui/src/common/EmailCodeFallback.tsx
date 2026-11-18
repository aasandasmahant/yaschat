import { Box } from '@yas chat/fuselage';
import { ActionLink } from '@yas chat/layout';
import { Trans } from 'react-i18next';

type EmailCodeFallbackProps = {
	onResendEmailRequest: () => void;
	onChangeEmailRequest: () => void;
};

const EmailCodeFallback = ({ onResendEmailRequest, onChangeEmailRequest }: EmailCodeFallbackProps) => (
	<Box fontScale='p2'>
		<Trans i18nKey='component.emailCodeFallback'>
			Didn’t receive email?
			<ActionLink onClick={onResendEmailRequest}>Resend</ActionLink>
			or
			<ActionLink onClick={onChangeEmailRequest}>Change email</ActionLink>
		</Trans>
	</Box>
);

export default EmailCodeFallback;
