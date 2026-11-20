import { useMethod } from '@yaschat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

export const useMessageSearchProviderQuery = () => {
	const getSearchProvider = useMethod('yaschatSearch.getProvider');
	return useQuery({
		queryKey: ['search', 'provider'] as const,

		queryFn: async () => {
			const provider = await getSearchProvider();
			if (provider === undefined) {
				throw new Error('Search provider not found');
			}

			return provider;
		},
	});
};
