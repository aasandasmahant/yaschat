import { Button } from '@yas chat/fuselage';
import { MessageFooterCallout, MessageFooterCalloutContent } from '@yas chat/ui-composer';
import { useEndpoint, useToastMessageDispatch } from '@yas chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { useRoom, useUserIsSubscribed } from '../contexts/RoomContext';

const ComposerReadOnly = () => {
	const { t } = useTranslation();
	const room = useRoom();
	const isSubscribed = useUserIsSubscribed();
	const joinChannel = useEndpoint('POST', '/v1/rooms.join');

	const dispatchToastMessage = useToastMessageDispatch();

	const join = useMutation({
		mutationFn: () => joinChannel({ roomId: room._id }),

		onError: (error: unknown) => {
			dispatchToastMessage({ type: 'error', message: error });
		},
	});

	return (
		<MessageFooterCallout>
			<MessageFooterCalloutContent>{t('room_is_read_only')}</MessageFooterCalloutContent>
			{!isSubscribed && (
				<Button variant='primary' onClick={() => join.mutate()} loading={join.isPending}>
					{t('Join')}
				</Button>
			)}
		</MessageFooterCallout>
	);
};

export default ComposerReadOnly;
