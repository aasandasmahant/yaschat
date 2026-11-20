import { IconButton } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { GenericModal } from '@yaschat/ui-client';
import { useSetModal, useToastMessageDispatch } from '@yaschat/ui-contexts';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useRemoveCurrentChatMutation } from './hooks/useRemoveCurrentChatMutation';

export type RemoveChatButtonProps = { _id: string };

const RemoveChatButton = ({ _id }: RemoveChatButtonProps) => {
	const removeCurrentChatMutation = useRemoveCurrentChatMutation();
	const setModal = useSetModal();
	const dispatchToastMessage = useToastMessageDispatch();
	const { t } = useTranslation();

	const handleRemoveClick = useStableCallback(async () => {
		removeCurrentChatMutation.mutate(_id);
	});

	const handleDelete = useStableCallback((e: MouseEvent) => {
		e.stopPropagation();
		const onDeleteAgent = async (): Promise<void> => {
			try {
				await handleRemoveClick();
				dispatchToastMessage({ type: 'success', message: t('Chat_removed') });
			} catch (error) {
				dispatchToastMessage({ type: 'error', message: error });
			}
			setModal(null);
		};

		setModal(<GenericModal variant='danger' onConfirm={onDeleteAgent} onCancel={() => setModal(null)} confirmText={t('Delete')} />);
	});

	return (
		<IconButton
			variant='danger'
			size='small'
			icon='trash'
			title={t('Remove')}
			disabled={removeCurrentChatMutation.isPending}
			onClick={handleDelete}
		/>
	);
};

export default RemoveChatButton;
