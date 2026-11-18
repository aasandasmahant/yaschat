import type { IRoom } from '@yas chat/core-typings';
import { isDirectMessageRoom, isMultipleDirectMessageRoom } from '@yas chat/core-typings';
import { RoomAvatar } from '@yas chat/ui-avatar';
import { useUser } from '@yas chat/ui-contexts';
import { VideoConfPopupInfo } from '@yas chat/ui-video-conf';

import { RoomIcon } from '../../../../../../components/RoomIcon';
import ReactiveUserStatus from '../../../../../../components/UserStatus/ReactiveUserStatus';
import { useVideoConfRoomName } from '../../hooks/useVideoConfRoomName';

export type VideoConfPopupRoomInfoProps = { room: IRoom };

const VideoConfPopupRoomInfo = ({ room }: VideoConfPopupRoomInfoProps) => {
	const ownUser = useUser();
	const [userId] = room?.uids?.filter((uid) => uid !== ownUser?._id) || [];
	const roomName = useVideoConfRoomName(room);
	const avatar = <RoomAvatar room={room} size='x40' />;

	if (isDirectMessageRoom(room)) {
		return (
			<VideoConfPopupInfo
				avatar={avatar}
				{...(userId && {
					icon: isMultipleDirectMessageRoom(room) ? <RoomIcon placement='default' room={room} /> : <ReactiveUserStatus uid={userId} />,
				})}
			>
				{roomName}
			</VideoConfPopupInfo>
		);
	}

	return (
		<VideoConfPopupInfo avatar={avatar} icon={<RoomIcon placement='default' room={room} />}>
			{roomName}
		</VideoConfPopupInfo>
	);
};

export default VideoConfPopupRoomInfo;
