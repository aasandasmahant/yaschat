import { kebabCase } from 'change-case';

const categories = [
	'typography',
	'breakpoints',
	'colors',
	'badge',
	'button',
	'font',
	'shadow',
	'status',
	'statusBullet',
	'stroke',
	'surface',
	'border',
	'spacing',
];

const filterByCategory = (root) => (token) => token.attributes.category === root;

export default {
	source: ['src/**/*.json'],
	platforms: {
		'fuselage/json': {
			transformGroup: 'json/yaschat',
			buildPath: 'dist/',
			files: categories.map((category) => ({
				destination: `${category}.json`,
				format: 'json/yaschat',
				filter: filterByCategory(category),
			})),
		},
		'fuselage/scss': {
			transformGroup: 'scss/yaschat',
			buildPath: 'dist/',
			files: categories.map((category) => ({
				destination: `${category}.scss`,
				format: 'scss/map-flat',
				options: {
					mapName: kebabCase(category),
				},
				filter: filterByCategory(category),
			})),
		},
		'fuselage/ts': {
			transformGroup: 'json/yaschat',
			buildPath: 'dist/',
			files: categories.map((category) => ({
				destination: `${category}.d.json.ts`,
				format: 'dts/yaschat',
				options: {
					mapName: kebabCase(category),
				},
				filter: filterByCategory(category),
			})),
		},
	},
};
