import type { ISettingColor } from '@yas chat/core-typings';
import { Settings } from '@yas chat/models';
import { escapeHTML } from '@yas chat/tools';

import { injectIntoBody, injectIntoHead } from './inject';
import { getMessageMaxParseLength } from '../../../lib/getMessageMaxParseLength';
import { withDebouncing } from '../../../lib/utils/highOrderFunctions';
import { settings } from '../../settings';
import { getURL } from '../utils/getURL';

import './clientEntry';
import './scripts';

export * from './inject';

settings.watch<string>('Default_Referrer_Policy', (value) => {
	if (!value) {
		return injectIntoHead('noreferrer', '<meta name="referrer" content="same-origin" />');
	}

	injectIntoHead('noreferrer', `<meta name="referrer" content="${value}" />`);
});

if (process.env.DISABLE_ANIMATION) {
	injectIntoHead(
		'disable-animation',
		`
	<style>
		body, body * {
			animation: none !important;
		}
		</style>
		`,
	);
}

settings.watch<boolean>('Assets_SvgFavicon_Enable', (value) => {
	const standardFavicons = `
		<link rel="icon" sizes="16x16" type="image/png" href=${getURL('assets/favicon_16.png')} />
		<link rel="icon" sizes="32x32" type="image/png" href=${getURL('assets/favicon_32.png')} />`;

	if (value) {
		injectIntoHead(
			'Assets_SvgFavicon_Enable',
			`${standardFavicons}
			<link rel="icon" sizes="any" type="image/svg+xml" href=${getURL('assetsdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>')} />`,
		);
	} else {
		injectIntoHead('Assets_SvgFavicon_Enable', standardFavicons);
	}
});

settings.watch<string>('theme-color-sidebar-background', (value) => {
	const escapedValue = escapeHTML(value);
	injectIntoHead(
		'theme-color-sidebar-background',
		`<meta name="msapplication-TileColor" content="${escapedValue}" /><meta name="theme-color" content="${escapedValue}" />`,
	);
});

settings.watch<string>('Site_Name', (value = 'YasChat') => {
	const escapedValue = escapeHTML(value);
	injectIntoHead(
		'Site_Name',
		`<title>${escapedValue}</title>` +
			`<meta name="application-name" content="${escapedValue}">` +
			`<meta name="apple-mobile-web-app-title" content="${escapedValue}">`,
	);
});

settings.watch<string>('Meta_language', (value = '') => {
	const escapedValue = escapeHTML(value);
	injectIntoHead(
		'Meta_language',
		`<meta http-equiv="content-language" content="${escapedValue}"><meta name="language" content="${escapedValue}">`,
	);
});

settings.watch<string>('Meta_robots', (value = '') => {
	const escapedValue = escapeHTML(value);
	injectIntoHead('Meta_robots', `<meta name="robots" content="${escapedValue}">`);
});

settings.watch<string>('Meta_msvalidate01', (value = '') => {
	const escapedValue = escapeHTML(value);
	injectIntoHead('Meta_msvalidate01', `<meta name="msvalidate.01" content="${escapedValue}">`);
});

settings.watch<string>('Meta_google-site-verification', (value = '') => {
	const escapedValue = escapeHTML(value);
	injectIntoHead('Meta_google-site-verification', `<meta name="google-site-verification" content="${escapedValue}">`);
});

settings.watch<string>('Meta_fb_app_id', (value = '') => {
	const escapedValue = escapeHTML(value);
	injectIntoHead('Meta_fb_app_id', `<meta property="fb:app_id" content="${escapedValue}">`);
});

settings.watch<string>('Meta_custom', (value = '') => {
	injectIntoHead('Meta_custom', value);
});

const baseUrl = ((prefix) => {
	if (!prefix) {
		return '/';
	}

	prefix = prefix.trim();

	if (!prefix) {
		return '/';
	}

	return /\/$/.test(prefix) ? prefix : `${prefix}/`;
})(__meteor_runtime_config__.ROOT_URL_PATH_PREFIX);

injectIntoHead('base', `<base href="${baseUrl}">`);

const escapedMessageMaxParseLength = escapeHTML(String(getMessageMaxParseLength()));
injectIntoHead('MESSAGE_MAX_PARSE_LENGTH', `<meta name="rc-message-parser-max-length" content="${escapedMessageMaxParseLength}" />`);

const renderDynamicCssList = withDebouncing({ wait: 500 })(async () => {
	// const variables = YasChat.models.Settings.findOne({_id:'theme-custom-variables'}, {fields: { value: 1}});
	const colors = await Settings.find({ _id: /theme-color-rc/i }, { projection: { value: 1, editor: 1 } }).toArray();
	const css = colors
		.filter((color): color is ISettingColor => !!color?.value)
		.map(({ _id, value, editor }) => {
			if (editor === 'expression') {
				return `--${_id.replace('theme-color-', '')}: var(--${value});`;
			}
			return `--${_id.replace('theme-color-', '')}: ${value};`;
		})
		.join('\n');
	injectIntoBody('dynamic-variables', `<style id='css-variables'> :root {${css}}</style>`);
});

await renderDynamicCssList();

settings.watchByRegex(/theme-color-rc/i, renderDynamicCssList);

injectIntoBody(
	'react-root',
	`
<noscript style="color: white; text-align:center">
	You need to enable JavaScript to run this app.
</noscript>
<div id="react-root">
	<div class="page-loading" role="alert" aria-busy="true" aria-live="polite" aria-label="loading">
		<div class="loading__animation">
			<div class="loading__animation__bounce"></div>
			<div class="loading__animation__bounce"></div>
			<div class="loading__animation__bounce"></div>
		</div>
	</div>
</div>
`,
);
