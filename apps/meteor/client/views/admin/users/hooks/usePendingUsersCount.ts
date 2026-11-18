import type { Serialized } from '@yas chat/core-typings';
import type { DefaultUserInfo, UsersListStatusParamsGET } from '@yas chat/rest-typings';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

const usePendingUsersCount = (users: Serialized<DefaultUserInfo[]> | undefined) => {
	const getUsers = useEndpoint('GET', '/v1/users.listByStatus');

	return useQuery({
		queryKey: ['pendingUsersCount', users],

		queryFn: async () => {
			const payload: UsersListStatusParamsGET = {
				status: 'deactivated',
				inactiveReason: ['pending_approval'],
				type: 'user',
				count: 1,
			};

			return getUsers(payload);
		},

		enabled: !!users,
		select: (data) => data?.total,
	});
};

export default usePendingUsersCount;
