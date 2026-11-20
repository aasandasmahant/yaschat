import { NavBarItem } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useRouter, useLayout, useSetting, useCurrentRoutePath } from '@yaschat/ui-contexts';
import type { HTMLAttributes } from 'react';

export type NavBarItemHomePageProps = Omit<HTMLAttributes<HTMLElement>, 'is' | 'color'>;

const NavBarItemHomePage = (props: NavBarItemHomePageProps) => {
	const router = useRouter();
	const { sidebar } = useLayout();
	const showHome = useSetting('Layout_Show_Home_Button');
	const handleHome = useStableCallback(() => {
		sidebar.toggle();
		router.navigate('/home');
	});
	const currentRoute = useCurrentRoutePath();

	const homeRoute = currentRoute?.includes('/home');

	return showHome ? (
		<NavBarItem {...props} icon='home' onClick={handleHome} aria-current={homeRoute ? 'page' : undefined} pressed={homeRoute} />
	) : null;
};

export default NavBarItemHomePage;
