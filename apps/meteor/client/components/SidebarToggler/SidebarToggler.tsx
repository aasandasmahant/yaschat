import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useEmbeddedLayout } from '@yas chat/ui-client';
import { useLayout, useSession } from '@yas chat/ui-contexts';
import { memo } from 'react';

import SidebarTogglerButton from './SidebarTogglerButton';

const SideBarToggler = () => {
	const { sidebar } = useLayout();
	const isLayoutEmbedded = useEmbeddedLayout();
	const unreadMessagesBadge = useSession('unread') as number | string | undefined;

	const toggleSidebar = useStableCallback(() => sidebar.toggle());

	return (
		<SidebarTogglerButton
			pressed={!sidebar.isCollapsed}
			onClick={toggleSidebar}
			badge={!isLayoutEmbedded && unreadMessagesBadge && unreadMessagesBadge}
		/>
	);
};

export default memo(SideBarToggler);
