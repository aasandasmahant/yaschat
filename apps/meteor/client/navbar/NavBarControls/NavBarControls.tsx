import { NavBarSection, NavBarGroup } from '@yas chat/fuselage';
import { OngoingCallsDropdown, useOngoingCalls } from '@yas chat/ui-conference';
import { useUser, useLayout } from '@yas chat/ui-contexts';
import { useMediaCallAction } from '@yas chat/ui-voip';
import { useTranslation } from 'react-i18next';

import NavBarControlsWithData from './NavBarControlsWithData';
import { useOmnichannelEnabled } from '../../views/omnichannel/hooks/useOmnichannelEnabled';
import NavBarOmnichannelGroup from '../NavBarOmnichannelGroup';
import { NavBarItemLoginPage, NavBarItemAdministrationMenu, UserMenu } from '../NavBarSettingsToolbar';
import NavBarVoipGroup from '../NavBarVoipGroup';

const NavBarControls = () => {
	const { t } = useTranslation();
	const user = useUser();
	const { isMobile } = useLayout();

	const showOmnichannel = useOmnichannelEnabled();
	const callAction = useMediaCallAction();

	// The section draws a divider after every child it is given, so the calls get a place only when there are some.
	const { ringing, ongoing, declined } = useOngoingCalls();
	const hasOngoingCalls = ringing.length + ongoing.length + declined.length > 0;

	if (isMobile) {
		return (
			<NavBarSection>
				{hasOngoingCalls && <OngoingCallsDropdown />}
				{(showOmnichannel || callAction) && <NavBarControlsWithData />}
				<NavBarGroup aria-label={t('Workspace_and_user_preferences')}>
					<NavBarItemAdministrationMenu />
					{user ? <UserMenu user={user} /> : <NavBarItemLoginPage />}
				</NavBarGroup>
			</NavBarSection>
		);
	}

	return (
		<NavBarSection>
			{hasOngoingCalls && <OngoingCallsDropdown />}
			{callAction && <NavBarVoipGroup />}
			{showOmnichannel && <NavBarOmnichannelGroup />}
			<NavBarGroup aria-label={t('Workspace_and_user_preferences')}>
				<NavBarItemAdministrationMenu />
				{user ? <UserMenu user={user} /> : <NavBarItemLoginPage />}
			</NavBarGroup>
		</NavBarSection>
	);
};

export default NavBarControls;
