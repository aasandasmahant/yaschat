import { IconButton } from '@yaschat/fuselage';
import { GenericModal } from '@yaschat/ui-client';
import { useSetModal } from '@yaschat/ui-contexts';
import type { ReactNode } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type InfoTextIconModalProps = {
	title: string;
	infoText: ReactNode;
};

const InfoTextIconModal = ({ title, infoText }: InfoTextIconModalProps) => {
	const setModal = useSetModal();
	const { t } = useTranslation();

	const handleInfoClick = () => {
		if (!infoText) {
			setModal(null);
			return;
		}
		setModal(
			<GenericModal icon='info' title={title} onClose={() => setModal(null)}>
				{infoText}
			</GenericModal>,
		);
	};

	return <IconButton icon='info' aria-label={t('Click_here_for_more_info')} size='mini' onClick={() => handleInfoClick()} />;
};

export default memo(InfoTextIconModal);
