import type { IMessage } from '@yas chat/core-typings';
import { MessageSystemBody } from '@yas chat/fuselage';
import { MessageTypes } from '@yas chat/message-types';
import { useTranslation } from 'react-i18next';

type SystemMessageBodyProps = {
	message: IMessage;
};

const SystemMessageBody = ({ message }: SystemMessageBodyProps) => {
	const { t } = useTranslation();
	const messageType = MessageTypes.getType(message);

	if (!messageType) {
		return null;
	}

	return (
		<MessageSystemBody role='document' aria-roledescription={t('system_message_body')}>
			{messageType.text(t, message)}
		</MessageSystemBody>
	);
};

export default SystemMessageBody;
