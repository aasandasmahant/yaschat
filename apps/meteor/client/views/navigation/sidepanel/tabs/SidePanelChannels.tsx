import type { ISubscription } from '@yas chat/core-typings';
import { useUserDisplayName } from '@yas chat/ui-client';

import { useUnreadOnlyToggle } from '../../contexts/RoomsNavigationContext';
import SidePanel from '../SidePanel';
import { useChannelsChildrenList } from '../hooks/useChannelsChildrenList';

export type SidePanelChannelsProps = { parentRid: string; subscription: ISubscription };

const SidePanelChannels = ({ parentRid, subscription }: SidePanelChannelsProps) => {
	const isDirectSubscription = subscription?.t === 'd';

	const username = useUserDisplayName({ name: subscription?.fname, username: subscription?.name });
	const [unreadOnly, toggleUnreadOnly] = useUnreadOnlyToggle();
	const rooms = useChannelsChildrenList(parentRid, unreadOnly);

	return (
		<SidePanel
			title={(isDirectSubscription ? username : subscription?.fname) || subscription.name}
			currentTab={isDirectSubscription ? 'directMessages' : 'channels'}
			unreadOnly={unreadOnly}
			toggleUnreadOnly={toggleUnreadOnly}
			rooms={rooms}
		/>
	);
};

export default SidePanelChannels;
