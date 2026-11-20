import type { IMessage, MessageAttachmentAction } from '@yaschat/core-typings';
import { Button } from '@yaschat/fuselage';
import { useToastMessageDispatch } from '@yaschat/ui-contexts';
import type { ReactNode } from 'react';

import { usePerformActionMutation } from './hooks/usePerformActionMutation';

type ProcessingType = Exclude<MessageAttachmentAction['actions'][number]['msg_processing_type'], undefined>;

export type ActionAttachmentButtonProps = {
	children: ReactNode;
	mid?: IMessage['_id'];
	msg?: string;
	processingType: ProcessingType;
};

const ActionAttachmentButton = ({ children, processingType, msg, mid }: ActionAttachmentButtonProps) => {
	const dispatchToastMessage = useToastMessageDispatch();

	const performActionMutation = usePerformActionMutation({
		onError: (error) => {
			dispatchToastMessage({ type: 'error', message: error });
		},
	});

	return (
		<Button
			size='small'
			value={msg}
			id={mid}
			disabled={performActionMutation.isPending}
			onClick={(event): void => {
				event.preventDefault();

				performActionMutation.mutate({
					processingType,
					msg,
					mid,
				});
			}}
		>
			{children}
		</Button>
	);
};

export default ActionAttachmentButton;
