import type { ISidebarCategory } from '@yas chat/core-typings';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

export const usePersistCategoriesMutation = () => {
	const saveUserPreferences = useEndpoint('POST', '/v1/users.setPreferences');

	return useMutation({
		mutationFn: (categories: ISidebarCategory[]) => saveUserPreferences({ data: { sidebarCategories: categories } }),
	});
};
