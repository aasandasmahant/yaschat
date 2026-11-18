import type { AppliedFilter } from '@yas chat/ai-search';
import { useUserSubscriptions } from '@yas chat/ui-contexts';
import { useMemo } from 'react';

export const useDiscussionFilterLabels = (filters: AppliedFilter[]): AppliedFilter[] => {
	const query = useMemo(
		() => ({
			prid: { $exists: true },
			name: { $in: filters.filter(({ key }) => key === 'in').map(({ value }) => value) },
		}),
		[filters],
	);
	const discussions = useUserSubscriptions(query);

	return useMemo(
		() =>
			filters.map((filter) => {
				if (filter.key !== 'in') {
					return filter;
				}

				const discussion = discussions.find(({ name }) => name === filter.value);

				return discussion?.fname ? { ...filter, meta: { label: discussion.fname } } : filter;
			}),
		[discussions, filters],
	);
};
