import { SIDEBAR_SYSTEM_GROUP_KEYS } from '@yas chat/core-typings';
import { useUserPreference } from '@yas chat/ui-contexts';

export const useSidebarSectionsOrder = (): readonly string[] =>
	useUserPreference<string[]>('sidebarSectionsOrder') ?? SIDEBAR_SYSTEM_GROUP_KEYS;
