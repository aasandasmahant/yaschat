import type { UsersInfoParamsGet } from '@yaschat/rest-typings';
import { useEndpoint } from '@yaschat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type UserInfoQueryOptions = {
	enabled?: boolean;
	placeholderData?: <T>(previousData: T | undefined) => T | undefined;
};

// a hook using tanstack useQuery and useEndpoint that fetches user information from the `users.info` endpoint
export const useUserInfoQuery = (params: UsersInfoParamsGet, options: UserInfoQueryOptions = { placeholderData: keepPreviousData }) => {
	const getUserInfo = useEndpoint('GET', '/v1/users.info');
	return useQuery({
		queryKey: ['users.info', params],
		queryFn: () => getUserInfo({ ...params }),
		...options,
	});
};
