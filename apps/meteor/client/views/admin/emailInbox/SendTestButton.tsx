import type { IEmailInboxPayload } from '@yas chat/core-typings';
import { Button } from '@yas chat/fuselage';
import { GenericTableCell } from '@yas chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@yas chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

export type SendTestButtonProps = { id: IEmailInboxPayload['_id'] };

const SendTestButton = ({ id }: SendTestButtonProps) => {
	const { t } = useTranslation();
	const dispatchToastMessage = useToastMessageDispatch();
	const sendTest = useEndpoint('POST', '/v1/email-inbox.send-test/:_id', { _id: id });

	const handleOnClick = async (e: MouseEvent<HTMLElement>): Promise<void> => {
		e.preventDefault();
		e.stopPropagation();

		try {
			await sendTest();
			dispatchToastMessage({
				type: 'success',
				message: t('Email_sent'),
			});
		} catch (error) {
			dispatchToastMessage({
				type: 'error',
				message: error,
			});
		}
	};

	return (
		<GenericTableCell truncate>
			<Button icon='send' size='small' onClick={handleOnClick}>
				{t('Send_Test_Email')}
			</Button>
		</GenericTableCell>
	);
};

export default SendTestButton;
