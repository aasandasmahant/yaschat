import type { IUser } from '@yaschat/core-typings';
import { Icon, Tag, Skeleton } from '@yaschat/fuselage';
import { useUserDisplayName } from '@yaschat/ui-client';

import { useUserInfoQuery } from '../../../../hooks/useUserInfoQuery';

export type RoomForewordUsernameListItemProps = {
	href: string | undefined;
	username: NonNullable<IUser['username']>;
};

const RoomForewordUsernameListItem = ({ username, href }: RoomForewordUsernameListItemProps) => {
	const { data, isLoading, isError, isSuccess } = useUserInfoQuery({ username });
	const displayName = useUserDisplayName({ name: data?.user?.name, username });

	return (
		<Tag icon={<Icon name='user' size='x20' />} data-username={username} large href={href}>
			{isLoading && <Skeleton variant='rect' />}
			{isError && username}
			{isSuccess && displayName}
		</Tag>
	);
};

export default RoomForewordUsernameListItem;
