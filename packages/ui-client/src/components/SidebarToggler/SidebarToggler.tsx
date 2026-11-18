import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useLayout, useSession } from '@yas chat/ui-contexts';
import { memo } from 'react';

import SidebarTogglerButton from './SidebarTogglerButton';
import { useEmbeddedLayout } from '../../hooks';

const SideBarToggler = () => {
	const { sidebar } = useLayout();
	const isLayoutEmbedded = useEmbeddedLayout();
	const unreadMessagesBadge = useSession('unread') as number | string | undefined;

	const toggleSidebar = useStableCallback(() => sidebar.toggle());

	return <SidebarTogglerButton onClick={toggleSidebar} badge={!isLayoutEmbedded && unreadMessagesBadge && unreadMessagesBadge} />;
};

export default memo(SideBarToggler);
