import { Button, ButtonGroup } from '@yas chat/fuselage';
import { Form, FormContainer, FormHeader, FormTitle } from '@yas chat/layout';
import { useDocumentTitle } from '@yas chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { DispatchLoginRouter } from './hooks/useLoginRouter';

export type GuestFormProps = { setLoginRoute: DispatchLoginRouter };

const GuestForm = ({ setLoginRoute }: GuestFormProps) => {
	const { t } = useTranslation();
	useDocumentTitle(t('registration.component.login'), false);

	return (
		<Form>
			<FormHeader>
				<FormTitle>{t('registration.page.guest.chooseHowToJoin')}</FormTitle>
			</FormHeader>
			<FormContainer>
				<ButtonGroup large stretch vertical>
					<Button variant='primary' onClick={() => setLoginRoute('login')}>
						{t('registration.page.guest.loginWithYasChat')}
					</Button>
					<Button onClick={() => setLoginRoute('anonymous')}>{t('registration.page.guest.continueAsGuest')}</Button>
				</ButtonGroup>
			</FormContainer>
		</Form>
	);
};

export default GuestForm;
