import type { IEmailInbox } from '@yas chat/core-typings';
import { States, StatesIcon, StatesTitle } from '@yas chat/fuselage';
import { FormSkeleton } from '@yas chat/ui-client';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EmailInboxForm from './EmailInboxForm';

export type EmailInboxFormWithDataProps = { id: IEmailInbox['_id'] };

const EmailInboxFormWithData = ({ id }: EmailInboxFormWithDataProps) => {
	const { t } = useTranslation();
	const getEmailInboxById = useEndpoint('GET', '/v1/email-inbox/:_id', { _id: id });
	const { data, isPending, error } = useQuery({
		queryKey: ['email-inbox', id],
		queryFn: () => getEmailInboxById(),
	});

	if (isPending) {
		return <FormSkeleton />;
	}

	if (error || !data) {
		return (
			<States>
				<StatesIcon name='circle-exclamation' variation='danger' />
				<StatesTitle>{t('error-email-inbox-not-found')}</StatesTitle>
			</States>
		);
	}

	return <EmailInboxForm inboxData={data} />;
};

export default EmailInboxFormWithData;
