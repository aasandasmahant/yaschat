import type { IMessage } from '@yaschat/core-typings';
import { isE2EEMessage } from '@yaschat/core-typings';
import { useSafely } from '@yaschat/fuselage-hooks';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { e2e } from '../../../../../lib/e2ee/yaschat.e2e';

export const useDecryptedMessage = (message: IMessage): string => {
	const { t } = useTranslation();
	const [decryptedMessage, setDecryptedMessage] = useSafely(useState(t('E2E_message_encrypted_placeholder')));

	useEffect(() => {
		if (!isE2EEMessage(message)) {
			return;
		}

		e2e.decryptMessage(message).then((decryptedMsg) => {
			if (decryptedMsg.msg) {
				setDecryptedMessage(decryptedMsg.msg);
			}

			if (decryptedMsg.attachments && decryptedMsg.attachments?.length > 0) {
				if (decryptedMsg.attachments[0].description) {
					setDecryptedMessage(decryptedMsg.attachments[0].description);
				} else {
					setDecryptedMessage(t('Message_with_attachment'));
				}
			}
		});
	}, [message, t, setDecryptedMessage]);

	return isE2EEMessage(message) ? decryptedMessage : message.msg;
};
