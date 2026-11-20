import type { SearchUserSuggestionSource } from '@yaschat/ai-search';
import { Box, SidebarItemIcon } from '@yaschat/fuselage';
import { UserAvatar } from '@yaschat/ui-avatar';
import { useUserDisplayName } from '@yaschat/ui-client';
import type { ComponentProps, ReactElement } from 'react';
import { memo } from 'react';

import NavBarSearchItem from './NavBarSearchItem';
import { ReactiveUserStatus } from '../../components/UserStatus';

export type NavBarSearchFilterUserSuggestionProps = {
	user: SearchUserSuggestionSource;
} & Partial<ComponentProps<typeof NavBarSearchItem>>;

const NavBarSearchFilterUserSuggestion = ({ user, ...props }: NavBarSearchFilterUserSuggestionProps): ReactElement => {
	const userDisplayName = useUserDisplayName(user);

	return (
		<NavBarSearchItem
			{...props}
			title={userDisplayName || user.username}
			avatar={<UserAvatar size='x20' username={user.username} etag={user.avatarETag} />}
			icon={<SidebarItemIcon icon={<ReactiveUserStatus uid={user._id} />} />}
			actions={
				<Box color='hint' fontScale='c1' flexShrink={0} maxWidth='x160' withTruncatedText>
					@{user.username}
				</Box>
			}
		/>
	);
};

export default memo(NavBarSearchFilterUserSuggestion);
