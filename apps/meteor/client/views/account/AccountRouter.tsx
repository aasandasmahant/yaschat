import { PageSkeleton } from '@yas chat/ui-client';
import { useRouter } from '@yas chat/ui-contexts';
import type { ReactNode } from 'react';
import { Suspense, useEffect } from 'react';

import AccountSidebar from './AccountSidebar';
import SidebarPortal from '../../portals/SidebarPortal';

export type AccountRouterProps = {
	children?: ReactNode;
};

const AccountRouter = ({ children }: AccountRouterProps) => {
	const router = useRouter();

	useEffect(
		() =>
			router.subscribeToRouteChange(() => {
				if (router.getRouteName() !== 'account-index') {
					return;
				}

				router.navigate('/account/profile', { replace: true });
			}),
		[router],
	);

	return children ? (
		<>
			<Suspense fallback={<PageSkeleton />}>{children}</Suspense>
			<SidebarPortal>
				<AccountSidebar />
			</SidebarPortal>
		</>
	) : (
		<PageSkeleton />
	);
};

export default AccountRouter;
