import { createSvgBuffer, createTtfBuffer, createWoffBuffer, createWoff2Buffer, createEotBuffer } from './font.mjs';
import { getMappedGlyphs } from './glyphs.mjs';
import { createSvgSprite, createSvgIcons } from './svg.mjs';
import { encodeJson, writeBinary, writeSource } from './utils.mjs';

const filterOtherIconsOut = (icons) => icons.filter(({ type }) => type !== 'other');

export const buildSvgImages = (icons) =>
	createSvgIcons(icons).then((svgIcons) =>
		Promise.all([
			...svgIcons.map(({ name, xml }) => writeSource(`./dist/svg/${name}.svg`)(xml)),
			createSvgSprite(svgIcons).then(writeSource('./dist/icons.svg')),
		]),
	);

export const buildCss = () =>
	writeSource('dist/yaschat.css')(`@font-face {
	font-family: 'YasChat';
	font-weight: 400;
	font-style: normal;
	font-display: auto;

	src: url('./font/yaschat.eot');
	src:
		url('./font/yaschat.eot?#iefix') format('embedded-opentype'),
		url('./font/yaschat.woff2') format('woff2'),
		url('./font/yaschat.woff') format('woff'),
		url('./font/yaschat.ttf') format('truetype'),
		url('./font/yaschat.svg#YasChat') format('svg');
}
`);

const fromIconDescriptorsToCharacters = (icons) =>
	getMappedGlyphs()
		.then((glyphsMapping) => icons.filter(({ name }) => !!glyphsMapping[name]).map(({ name }) => [name, glyphsMapping[name].start]))
		.then(Object.fromEntries);

export const buildEsmModule = (icons) =>
	Promise.resolve(icons)
		.then(fromIconDescriptorsToCharacters)
		.then((characters) => `export default ${encodeJson(characters)};`)
		.then(writeSource('dist/index.js'));

export const buildFont = (icons) =>
	Promise.resolve(icons)
		.then(filterOtherIconsOut)
		.then(createSvgBuffer)
		.then(writeBinary('./dist/font/yaschat.svg'))
		.then(createTtfBuffer)
		.then(writeBinary('./dist/font/yaschat.ttf'))
		.then((ttfBuffer) =>
			Promise.all([
				createWoffBuffer(ttfBuffer).then(writeBinary('./dist/font/yaschat.woff')),
				createWoff2Buffer(ttfBuffer).then(writeBinary('./dist/font/yaschat.woff2')),
				createEotBuffer(ttfBuffer).then(writeBinary('./dist/font/yaschat.eot')),
			]),
		);

export const buildDefinition = (icons) =>
	Promise.resolve(icons)
		.then(fromIconDescriptorsToCharacters)
		.then(
			(characters) => `declare const Icons: ${encodeJson(characters)};
export default Icons;
export type Keys = keyof typeof Icons;`,
		)
		.then(writeSource('dist/index.d.ts'));
