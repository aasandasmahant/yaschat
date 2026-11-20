import { NavBarGroup, NavBarSection } from '@yaschat/fuselage';
import { useLayout } from '@yaschat/ui-contexts';

import NavBarPagesGroup from './NavBarPagesGroup';
import SidebarToggler from '../components/SidebarToggler';

const NavBarPagesSection = () => {
	const { sidebar } = useLayout();

	return (
		<NavBarSection>
			{sidebar.shouldToggle && (
				<>
					<NavBarGroup>
						<SidebarToggler />
					</NavBarGroup>
				</>
			)}
			<NavBarPagesGroup />
		</NavBarSection>
	);
};

export default NavBarPagesSection;
