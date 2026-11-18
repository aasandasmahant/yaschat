import type { ISubscription } from '@yas chat/core-typings';
import { isPrivateRoom } from '@yas chat/core-typings';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import SidePanelTag from '../SidePanelTag';
import SidePanelTagIcon from '../SidePanelTagIcon';

export type SidePanelParentRoomProps = { subscription: ISubscription };

const SidePanelParentRoom = ({ subscription }: SidePanelParentRoomProps) => {
	const icon = isPrivateRoom(subscription) ? 'hashtag-lock' : 'hashtag';
	const roomName = roomCoordinator.getRoomName(subscription?.t, subscription);

	return <SidePanelTag icon={<SidePanelTagIcon icon={{ name: icon }} />}>{roomName}</SidePanelTag>;
};

export default SidePanelParentRoom;
