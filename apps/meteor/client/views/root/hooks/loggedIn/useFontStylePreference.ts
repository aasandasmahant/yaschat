import type { FontSize } from '@yas chat/rest-typings';
import { useCreateFontStyleElement } from '@yas chat/ui-client';
import { useUserPreference } from '@yas chat/ui-contexts';
import { useLayoutEffect } from 'react';

export const useFontStylePreference = () => {
	const fontSize = useUserPreference<FontSize>('fontSize');
	const createFontStyleElement = useCreateFontStyleElement();

	useLayoutEffect(() => {
		// Handle the edge case where the font-size preference ceases to exist: set to 100% (default)
		createFontStyleElement(fontSize || '100%');
	}, [fontSize, createFontStyleElement]);
};
