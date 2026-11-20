import { SIDEBAR_SYSTEM_GROUP_KEYS } from '@yaschat/core-typings';
import { useUserPreference } from '@yaschat/ui-contexts';

export const useSidebarSectionsOrder = (): readonly string[] =>
	useUserPreference<string[]>('sidebarSectionsOrder') ?? SIDEBAR_SYSTEM_GROUP_KEYS;
