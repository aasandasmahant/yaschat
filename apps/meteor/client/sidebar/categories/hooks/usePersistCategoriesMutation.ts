import type { ISidebarCategory } from '@yaschat/core-typings';
import { useEndpoint } from '@yaschat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

export const usePersistCategoriesMutation = () => {
	const saveUserPreferences = useEndpoint('POST', '/v1/users.setPreferences');

	return useMutation({
		mutationFn: (categories: ISidebarCategory[]) => saveUserPreferences({ data: { sidebarCategories: categories } }),
	});
};
