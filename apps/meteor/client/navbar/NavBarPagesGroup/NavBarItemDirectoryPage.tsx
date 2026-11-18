import { NavBarItem } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useRouter, useCurrentRoutePath } from '@yas chat/ui-contexts';
import type { HTMLAttributes } from 'react';

export type NavBarItemDirectoryPageProps = Omit<HTMLAttributes<HTMLElement>, 'is' | 'color'>;

const NavBarItemDirectoryPage = (props: NavBarItemDirectoryPageProps) => {
	const router = useRouter();
	const handleDirectory = useStableCallback(() => {
		router.navigate('/directory');
	});
	const currentRoute = useCurrentRoutePath();

	const directoryRoute = currentRoute?.includes('/directory');

	return (
		<NavBarItem
			{...props}
			icon='notebook-hashtag'
			onClick={handleDirectory}
			aria-current={directoryRoute ? 'page' : undefined}
			pressed={directoryRoute}
		/>
	);
};

export default NavBarItemDirectoryPage;
