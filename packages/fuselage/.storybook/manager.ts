// Keep in step with ../../storybook-config/src/manager.ts, which Fuselage can't import: storybook-config depends on Fuselage.
import { createElement } from 'react';
import type { API_HashEntry } from 'storybook/internal/types';
import { addons } from 'storybook/manager-api';

import manifest from '../package.json';
import logo from '.data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>';
import { applyComponentStatusColors, componentStatuses, findComponentStatus, getComponentStatusBadgeStyle } from './status';
import { createBrandTitle, readThemeGlobalFromUrl, resolveThemeMode, subscribeToThemeMode, themes, type ThemeMode } from './theme';

const createManagerTheme = (mode: ThemeMode) => ({
	...themes[mode],
	brandTitle: createBrandTitle(mode, { logo, name: manifest.name }),
	brandUrl: manifest.homepage,
});

/** Labels a component in the sidebar with its lifecycle status, when it has one. */
const renderLabel = (item: API_HashEntry) => {
	const componentStatus = item.type === 'component' ? findComponentStatus(item.tags) : undefined;

	if (!componentStatus) {
		return item.name;
	}

	const { label, description } = componentStatuses[componentStatus];

	return createElement(
		'span',
		{ style: { display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', gap: 8 } },
		createElement('span', null, item.name),
		createElement('span', { style: getComponentStatusBadgeStyle(componentStatus), title: description }, label),
	);
};

const initialMode = resolveThemeMode(readThemeGlobalFromUrl());

applyComponentStatusColors(document.documentElement, initialMode);

addons.setConfig({ theme: createManagerTheme(initialMode), sidebar: { renderLabel } });

addons.register('yas chat/fuselage-theme', (api) => {
	subscribeToThemeMode(api, readThemeGlobalFromUrl(), (mode) => {
		applyComponentStatusColors(document.documentElement, mode);
		api.setOptions({ theme: createManagerTheme(mode) });
	});
});
