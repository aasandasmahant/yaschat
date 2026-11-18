import type { ILivechatContact, Serialized } from '@yas chat/core-typings';
import { useRouter } from '@yas chat/ui-contexts';
import { useState } from 'react';

import ContactInfoHistory from './ContactInfoHistory';
import ContactInfoHistoryMessages from './ContactInfoHistoryMessages';

export type ContactInfoHistoryRouterProps = { contact: Serialized<ILivechatContact> };

const ContactInfoHistoryRouter = ({ contact }: ContactInfoHistoryRouterProps) => {
	const [chatId, setChatId] = useState<string | undefined>();
	const { navigate } = useRouter();

	if (chatId) {
		return (
			<ContactInfoHistoryMessages chatId={chatId} onBack={() => setChatId(undefined)} onOpenRoom={() => navigate(`/live/${chatId}`)} />
		);
	}

	return <ContactInfoHistory contact={contact} setChatId={setChatId} />;
};

export default ContactInfoHistoryRouter;
