import type { ThemePreference as ThemeMode } from '@yas chat/core-typings';
import { useDarkMode } from '@yas chat/fuselage-hooks';
import { useUserPreference } from '@yas chat/ui-contexts';

/**
 * Returns the resolved theme string based on the user's theme appearance preference and system dark-mode setting.
 */
export const useThemeMode = () => {
	const themeMode = useUserPreference<ThemeMode>('themeAppearence') || 'auto';
	const isDarkMode = useDarkMode(themeMode === 'auto' ? undefined : themeMode === 'dark');

	if (isDarkMode) {
		return 'dark';
	}

	if (themeMode === 'high-contrast') {
		return 'high-contrast';
	}

	return 'light';
};
