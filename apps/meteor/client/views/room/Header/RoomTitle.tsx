import { isTeamRoom, type IRoom } from '@yas chat/core-typings';
import { useButtonPattern, useStableCallback } from '@yas chat/fuselage-hooks';
import { useDocumentTitle, HeaderTitle, HeaderTitleButton } from '@yas chat/ui-client';
import { useRoomToolbox } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import HeaderIconWithRoom from './HeaderIconWithRoom';

export type RoomTitleProps = { room: IRoom };

const RoomTitle = ({ room }: RoomTitleProps) => {
	const { t } = useTranslation();

	useDocumentTitle(room.name, false);
	const { openTab } = useRoomToolbox();

	const handleOpenRoomInfo = useStableCallback(() => {
		if (isTeamRoom(room)) {
			return openTab('team-info');
		}

		switch (room.t) {
			case 'l':
				openTab('room-info');
				break;

			case 'd':
				(room.uids?.length ?? 0) > 2 ? openTab('user-info-group') : openTab('user-info');
				break;

			default:
				openTab('channel-settings');
				break;
		}
	});

	const buttonProps = useButtonPattern(handleOpenRoomInfo);

	return (
		<HeaderTitleButton aria-label={`${room.name}${room.encrypted ? ` - ${t('encrypted')}` : ''}`} {...buttonProps}>
			<HeaderIconWithRoom room={room} />
			<HeaderTitle>{room.name}</HeaderTitle>
		</HeaderTitleButton>
	);
};

export default RoomTitle;
