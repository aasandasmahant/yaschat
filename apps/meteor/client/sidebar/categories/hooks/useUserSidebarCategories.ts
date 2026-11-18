import type { ISidebarCategory } from '@yas chat/core-typings';
import { useIsEnterprise } from '@yas chat/ui-client';
import { useUserPreference } from '@yas chat/ui-contexts';
import { useMemo } from 'react';

export type MovableRoom = { rid: string; name?: string; isFavorite?: boolean; categoryId?: string };

export const FAVORITES_TARGET = 'favorites';

export const useUserSidebarCategories = () => {
	const { data: { isEnterprise = false } = {} } = useIsEnterprise();
	const allEntries = useUserPreference<ISidebarCategory[]>('sidebarCategories');

	return useMemo(() => {
		const rawCategories = allEntries ?? [];
		const customCategories = rawCategories.filter((entry) => !entry.default);
		return isEnterprise ? { rawCategories, customCategories } : { rawCategories, customCategories: [] };
	}, [isEnterprise, allEntries]);
};
