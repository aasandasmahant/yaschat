import type { IOmnichannelRoom } from '@yas chat/core-typings';
import { Icon } from '@yas chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useIsRoomOverMacLimit } from '../hooks/useIsRoomOverMacLimit';

export type RoomActivityIconProps = {
	room: IOmnichannelRoom;
};

const RoomActivityIcon = ({ room }: RoomActivityIconProps) => {
	const { t } = useTranslation();
	const isRoomOverMacLimit = useIsRoomOverMacLimit(room);

	return isRoomOverMacLimit ? <Icon name='warning' size='x20' color='danger' title={t('Workspace_exceeded_MAC_limit_disclaimer')} /> : null;
};

export default RoomActivityIcon;
