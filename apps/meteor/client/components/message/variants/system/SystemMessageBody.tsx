import type { IMessage } from '@yaschat/core-typings';
import { MessageSystemBody } from '@yaschat/fuselage';
import { MessageTypes } from '@yaschat/message-types';
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
