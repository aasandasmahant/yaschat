import { Box, Button, ButtonGroup, Divider } from '@yas chat/fuselage';
import { useLoginServices, useSetting } from '@yas chat/ui-contexts';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

import type { LoginErrorState } from './LoginForm';
import LoginServicesButton from './LoginServicesButton';

const servicesToBeShownOnDesktop = ['cas', 'ldap'];

export type LoginServicesProps = { disabled?: boolean; setError: Dispatch<SetStateAction<LoginErrorState>> };

const LoginServices = ({ disabled, setError }: LoginServicesProps) => {
	const { t } = useTranslation();
	const services = useLoginServices();
	const showFormLogin = useSetting('Accounts_ShowFormLogin');

	const isDesktopApp = !!window.YasChatDesktop?.openInBrowser;

	const servicesToShow = useMemo(
		() => (isDesktopApp ? services.filter(({ service }) => servicesToBeShownOnDesktop.includes(service)) : services),
		[isDesktopApp, services],
	);

	if (services.length === 0) {
		return null;
	}

	const handleLoginOnWeb = () => {
		if (!isDesktopApp) {
			return;
		}

		const redirectUrl = new URL(window.location.href);
		redirectUrl.searchParams.set('loginClient', 'desktop');

		window.YasChatDesktop?.openInBrowser(redirectUrl.toString());
	};

	return (
		<>
			{showFormLogin && (
				<Box paddingBlock={24}>
					<Divider>{t('registration.component.form.divider')}</Divider>
				</Box>
			)}

			{(servicesToShow.length > 0 || isDesktopApp) && (
				<ButtonGroup vertical stretch small>
					{servicesToShow.map((service) => (
						<LoginServicesButton disabled={disabled} key={service.service} {...service} setError={setError} />
					))}
					{isDesktopApp && (
						<Button variant='primary' onClick={handleLoginOnWeb}>
							{t('registration.component.login.onWeb')}
						</Button>
					)}
				</ButtonGroup>
			)}
		</>
	);
};
export default LoginServices;
