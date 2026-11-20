import type { OperationResult, PaginatedRequest } from '@yaschat/rest-typings';
import { usePaginatedQuery } from '@yaschat/ui-client';
import { useEndpoint } from '@yaschat/ui-contexts';

type CurrentContactsQuery = PaginatedRequest<{
	searchText: string;
}>;

type CurrentContactsResult = OperationResult<'GET', '/v1/omnichannel/contacts.search'>;

export const useCurrentContacts = (query: CurrentContactsQuery, { offset, count }: { offset: number; count: number }) => {
	const currentContacts = useEndpoint('GET', '/v1/omnichannel/contacts.search');

	return usePaginatedQuery({
		query: {
			queryKey: ['current-contacts', query],
			queryFn: (page) => currentContacts({ ...query, ...page }) as unknown as Promise<CurrentContactsResult>,
		},
		itemsKey: 'contacts',
		offset,
		count,
	});
};
