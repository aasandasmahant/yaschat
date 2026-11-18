import type { IRoom } from '@yas chat/core-typings';
import { HeaderState } from '@yas chat/ui-client';
import { useSetting } from '@yas chat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type EncryptedProps = { room: IRoom };

const Encrypted = ({ room }: EncryptedProps) => {
	const { t } = useTranslation();
	const e2eEnabled = useSetting('E2E_Enable');
	return e2eEnabled && room?.encrypted ? <HeaderState title={t('Encrypted')} icon='key' color='status-font-on-success' /> : null;
};

export default memo(Encrypted);
