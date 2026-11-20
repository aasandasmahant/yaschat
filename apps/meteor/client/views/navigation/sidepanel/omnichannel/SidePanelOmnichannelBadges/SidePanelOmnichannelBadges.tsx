import type { IOmnichannelRoom } from '@yaschat/core-typings';

import SidePanelPriorityTag from './SidePanelPriorityTag';
import RoomActivityIcon from '../../../../omnichannel/components/RoomActivityIcon';
import { useOmnichannelPriorities } from '../../../../omnichannel/hooks/useOmnichannelPriorities';

export type SidePanelOmnichannelBadgesProps = { room: IOmnichannelRoom };

const SidePanelOmnichannelBadges = ({ room }: SidePanelOmnichannelBadgesProps) => {
	const { enabled: isPriorityEnabled } = useOmnichannelPriorities();

	return (
		<>
			{isPriorityEnabled ? <SidePanelPriorityTag priorityWeight={room.priorityWeight} /> : null}
			<RoomActivityIcon room={room} />
		</>
	);
};

export default SidePanelOmnichannelBadges;
