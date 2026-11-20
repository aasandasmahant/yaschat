import type { Serialized } from '@yaschat/core-typings';
import type { DefaultUserInfo, UsersListStatusParamsGET } from '@yaschat/rest-typings';
import { useEndpoint } from '@yaschat/ui-contexts';
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
