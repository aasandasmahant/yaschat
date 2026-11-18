import type { IMessage } from '@yas chat/core-typings';
import { GenericModal } from '@yas chat/ui-client';
import { useTranslation } from 'react-i18next';

import Reactions from './Reactions';

export type ReactionListModalProps = {
	reactions: Required<IMessage>['reactions'];
	onClose: () => void;
};

const ReactionListModal = ({ reactions, onClose }: ReactionListModalProps) => {
	const { t } = useTranslation();

	return (
		<GenericModal variant='info' title={t('Users_reacted')} onClose={onClose} onConfirm={onClose} confirmText={t('Close')}>
			<Reactions reactions={reactions} />
		</GenericModal>
	);
};

export default ReactionListModal;
