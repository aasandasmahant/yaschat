import type { IRoom } from '@yaschat/core-typings';
import { isOmnichannelRoom } from '@yaschat/core-typings';
import { Icon } from '@yaschat/fuselage';
import type { ComponentProps } from 'react';
import { isValidElement } from 'react';

import { OmnichannelRoomIcon } from './OmnichannelRoomIcon';
import { useRoomIcon } from '../../hooks/useRoomIcon';

export const RoomIcon = ({
	room,
	size = 'x16',
	isIncomingCall,
	placement = 'default',
}: {
	room: Pick<IRoom, 't' | 'prid' | 'teamMain' | 'uids' | 'u'>;
	size?: ComponentProps<typeof Icon>['size'];
	isIncomingCall?: boolean;
	placement?: 'sidebar' | 'default';
}) => {
	const iconPropsOrReactNode = useRoomIcon(room);

	if (isIncomingCall) {
		return <Icon name='phone' size={size} />;
	}

	if (isOmnichannelRoom(room)) {
		return <OmnichannelRoomIcon placement={placement} source={room.source} status={room.v?.status} size={size} />;
	}

	if (isValidElement<any>(iconPropsOrReactNode)) {
		return iconPropsOrReactNode;
	}

	if (!iconPropsOrReactNode) {
		return null;
	}

	return <Icon {...iconPropsOrReactNode} size={size} />;
};
