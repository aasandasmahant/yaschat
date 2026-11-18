import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import type { CSSProperties } from 'react';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// 1. Set up a jsdom DOM environment before loading fuselage.
//    Fuselage's webpack bundle reads window/document/document.body at module init time.
//    renderToStaticMarkup never calls effects, so the DOM is never actually used.
const { JSDOM } = require('jsdom') as { JSDOM: new (html: string, options?: { url?: string }) => { window: Window & typeof globalThis } };

const { window: jsdomWindow } = new JSDOM('<!DOCTYPE html><body></body>', { url: 'http://localhost' });

const g = globalThis as Record<string, unknown>;
g.self = jsdomWindow;
g.window = jsdomWindow;
g.document = jsdomWindow.document;

// 2. Redirect all React-family CJS requires to this repo's copy.
//    When @rocket.chat/fuselage is symlinked from a separate dev repo it has its own
//    node_modules/react, which creates a second React instance and breaks hook calls.
//    Module._resolveFilename runs before the module cache lookup, so this forces every
//    require('react') — including fuselage's internal ones — to resolve to the same file.
const NodeModule = require('module') as { _resolveFilename: (...args: unknown[]) => string };

const origResolveFilename = NodeModule._resolveFilename.bind(NodeModule);
const reactRedirects: Record<string, string> = {
	'react': require.resolve('react'),
	'react/jsx-runtime': require.resolve('react/jsx-runtime'),
	'react-dom': require.resolve('react-dom'),
	'react-dom/server': require.resolve('react-dom/server'),
};
NodeModule._resolveFilename = (...args: unknown[]) => {
	const request = args[0] as string;
	return reactRedirects[request] ?? origResolveFilename(...args);
};

// 3. Load fuselage and react-dom/server after all redirects are in place.
const { renderToStaticMarkup } = require('react-dom/server') as typeof import('react-dom/server');
const { flushSync } = require('react-dom') as typeof import('react-dom');
const { createRoot } = require('react-dom/client') as typeof import('react-dom/client');
const { States, StatesIcon, StatesSubtitle, StatesTitle, PaletteStyleTag } =
	require('@rocket.chat/fuselage') as typeof import('@rocket.chat/fuselage');

const fuselageCssPath = require.resolve('@rocket.chat/fuselage/dist/fuselage.css');

// 4. Embed the YasChat icon font as a base64 data URI.
//    fuselage.css sets font-family:YasChat on .rcx-icon but does not include the
//    @font-face declaration — that lives in @rocket.chat/icons. Inlining the woff2
//    makes the HTML fully self-contained with no external font file dependencies.
const iconFontPath = require.resolve('@rocket.chat/icons/dist/font/yaschat.woff2');
const iconFontBase64 = readFileSync(iconFontPath).toString('base64');
const iconFontCss = `@font-face {
  font-family: 'YasChat';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: url('data:font/woff2;base64,${iconFontBase64}') format('woff2');
}`;

// 5. Render PaletteStyleTag for all three themes using the real DOM renderer so its
//    createPortal calls work. Each instance injects a <style> tag into jsdom's
//    document.head, which we collect into dynamicStyles below.
//    renderToStaticMarkup does not support portals, so we use flushSync + createRoot.
const paletteContainer = jsdomWindow.document.createElement('div');
jsdomWindow.document.body.appendChild(paletteContainer);
const paletteRoot = createRoot(paletteContainer);
flushSync(() => {
	paletteRoot.render(
		<>
			<PaletteStyleTag theme='light' tagId='palette-light' />
			<PaletteStyleTag theme='dark' tagId='palette-dark' selector='[data-color-scheme="dark"]' />
			<PaletteStyleTag theme='high-contrast' tagId='palette-high-contrast' selector='[data-color-scheme="high-contrast"]' />
		</>,
	);
});

// Use a plain <div> for the outer container: Box's dynamic CSS classes (display, bg, etc.)
// are inserted via useInsertionEffect which doesn't run in renderToStaticMarkup.
// Inline styles and a CSS variable reference cover the same behavior.
const containerStyle: CSSProperties = {
	display: 'flex',
	position: 'absolute',
	justifyContent: 'center',
	alignItems: 'center',
	left: 0,
	top: 0,
	bottom: 0,
	right: 0,
	backgroundColor: 'var(--rcx-color-surface-tint)',
	zIndex: -1,
};

function LandingView() {
	return (
		<div style={containerStyle}>
			<States>
				<StatesIcon name='phone' />
				<StatesTitle data-i18n='Call_window'>Call window</StatesTitle>
				<StatesSubtitle data-i18n='You_can_close_this_window'>You can close this window.</StatesSubtitle>
			</States>
		</div>
	);
}

const body = renderToStaticMarkup(<LandingView />);

// In browser mode (jsdom present), @rocket.chat/css-in-js inserts generated styles
// into document.head via attachRules. Collect them now so we can inline them.
// Read the CSSOM rather than the text: in production builds rules are added with insertRule.
const dynamicStyles = Array.from(jsdomWindow.document.head.querySelectorAll('style'))
	.map((el) => (el.sheet ? Array.from(el.sheet.cssRules, (rule) => rule.cssText).join('\n') : (el.textContent ?? '')))
	.join('\n');

const fuselageCss = readFileSync(fuselageCssPath, 'utf-8');

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>html, body { margin: 0; padding: 0; width: 100%; height: 100%; }</style>
    <style>${iconFontCss}</style>
    <style>${fuselageCss}</style>
    <style>${dynamicStyles}</style>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%2300b4d8' d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/%3E%3Ccircle cx='44' cy='30' r='3' fill='%23fff'/%3E%3C/svg%3E">
</head>
  <body>
    <div id="root" style="position: relative; width: 100%; height: 100vh;" class="rcx-box--full">${body}</div>
  </body>
</html>`;

writeFileSync(`${__dirname}/voice-call-popup.html`, html, 'utf-8');
console.log('Generated dist/voice-call-popup.html');
