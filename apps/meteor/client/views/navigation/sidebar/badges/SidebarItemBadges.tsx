import { isInviteSubscription } from '@yas chat/core-typings';
import { Box } from '@yas chat/fuselage';
import type { SubscriptionWithRoom } from '@yas chat/ui-contexts';

import UnreadBadge from './UnreadBadge';
import InvitationBadge from '../../../../components/InvitationBadge';
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
			{isInviteSubscription(room) && (
				<Box display='flex' marginBlockStart='x4'>
					<InvitationBadge invitationDate={room.ts} />
				</Box>
			)}
		</>
	);
};

export default SidebarItemBadges;
