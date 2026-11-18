import { IconButton } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { GenericModal } from '@yas chat/ui-client';
import { useSetModal, useToastMessageDispatch } from '@yas chat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

function RemoveAgentButton({ agentId, onRemove }: { agentId: string; onRemove: (agentId: string) => void }) {
	const setModal = useSetModal();
	const dispatchToastMessage = useToastMessageDispatch();
	const { t } = useTranslation();

	const handleDelete = useStableCallback((e: MouseEvent) => {
		e.stopPropagation();

		const onRemoveAgent = async () => {
			onRemove(agentId);
			dispatchToastMessage({ type: 'success', message: t('Agent_removed') });
			setModal();
		};

		setModal(<GenericModal variant='danger' onConfirm={onRemoveAgent} onCancel={() => setModal()} confirmText={t('Delete')} />);
	});

	return <IconButton icon='trash' size='small' title={t('Remove')} onClick={handleDelete} />;
}

export default RemoveAgentButton;
