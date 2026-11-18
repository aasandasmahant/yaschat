import type { IRoom } from '@yas chat/core-typings';
import { isOmnichannelRoom } from '@yas chat/core-typings';
import { HeaderIcon } from '@yas chat/ui-client';

import { OmnichannelRoomIcon } from '../../../components/RoomIcon/OmnichannelRoomIcon';
import { useRoomIcon } from '../../../hooks/useRoomIcon';

export type HeaderIconWithRoomProps = {
	room: IRoom;
};

const HeaderIconWithRoom = ({ room }: HeaderIconWithRoomProps) => {
	const icon = useRoomIcon(room);
	if (isOmnichannelRoom(room)) {
		return <OmnichannelRoomIcon source={room.source} status={room.v?.status} size='x20' />;
	}

	return <HeaderIcon icon={icon} />;
};

export default HeaderIconWithRoom;
