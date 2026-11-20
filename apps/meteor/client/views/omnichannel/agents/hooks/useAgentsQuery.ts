import type { PaginatedRequest } from '@yaschat/rest-typings';
import { usePaginatedQuery } from '@yaschat/ui-client';
import { useEndpoint } from '@yaschat/ui-contexts';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

export const useAgentsQuery = (query: PaginatedRequest, { offset, count }: { offset: number; count: number }) => {
	const getAgents = useEndpoint('GET', '/v1/livechat/users/agent');

	return usePaginatedQuery({
		query: {
			queryKey: omnichannelQueryKeys.agents(query),
			queryFn: (page) => getAgents({ ...query, ...page }),
		},
		itemsKey: 'users',
		offset,
		count,
	});
};
