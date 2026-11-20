import { isInviteSubscription, isOmnichannelRoom } from '@yaschat/core-typings';
import { Box } from '@yaschat/fuselage';
import type { SubscriptionWithRoom } from '@yaschat/ui-contexts';

import UnreadBadge from './UnreadBadge';
import InvitationBadge from '../../components/InvitationBadge';
import OmnichannelBadges from '../../views/omnichannel/components/OmnichannelBadges';
import { useUnreadDisplay } from '../hooks/useUnreadDisplay';

export type SidebarItemBadgesProps = {
	room: SubscriptionWithRoom;
	roomTitle?: string;
};

const SidebarItemBadges = ({ room, roomTitle }: SidebarItemBadgesProps) => {
	const { unreadCount, unreadTitle, unreadVariant, showUnread } = useUnreadDisplay(room);

	return (
		<>
			{showUnread && <UnreadBadge title={unreadTitle} roomTitle={roomTitle} variant={unreadVariant} total={unreadCount.total} />}
			{isOmnichannelRoom(room) && <OmnichannelBadges room={room} />}
			{isInviteSubscription(room) && (
				<Box display='flex' marginBlockStart='x4'>
					<InvitationBadge invitationDate={room.ts} />
				</Box>
			)}
		</>
	);
};

export default SidebarItemBadges;
