import type { IOmnichannelCannedResponse } from '@yas chat/core-typings';
import { IconButton } from '@yas chat/fuselage';
import { GenericTableCell } from '@yas chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useRemoveCannedResponse } from './modals/useRemoveCannedResponse';

export type RemoveCannedResponseButtonProps = { id: IOmnichannelCannedResponse['_id'] };

const RemoveCannedResponseButton = ({ id }: RemoveCannedResponseButtonProps) => {
	const { t } = useTranslation();

	const handleDelete = useRemoveCannedResponse(id);

	return (
		<GenericTableCell truncate>
			<IconButton
				icon='trash'
				size='small'
				title={t('Remove')}
				onClick={(e) => {
					e.stopPropagation();
					handleDelete();
				}}
			/>
		</GenericTableCell>
	);
};

export default RemoveCannedResponseButton;
