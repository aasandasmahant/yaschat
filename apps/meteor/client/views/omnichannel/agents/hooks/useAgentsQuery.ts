import type { PaginatedRequest } from '@yas chat/rest-typings';
import { usePaginatedQuery } from '@yas chat/ui-client';
import { useEndpoint } from '@yas chat/ui-contexts';

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
