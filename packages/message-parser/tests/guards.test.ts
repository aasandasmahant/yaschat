import type { Image, OrderedList, Timestamp } from '../src/definitions.js';
import { isNodeOfType, parse } from '../src/index.js';
import { timestamp } from '../src/utils.js';

describe('isNodeOfType', () => {
	it('narrows timestamp nodes', () => {
		const value: unknown = timestamp('1708551317');

		expect(isNodeOfType(value, 'TIMESTAMP')).toBe(true);

		if (!isNodeOfType(value, 'TIMESTAMP')) {
			throw new Error('expected TIMESTAMP node');
		}

		const narrowed: Timestamp = value;
		expect(value.value.timestamp).toBe('1708551317');
		expect(value.value.format).toBe('t');
		expect(narrowed.value.format).toBe('t');
	});

	it('narrows ordered list nodes from parser output', () => {
		const value: unknown = parse('1. one')[0];

		expect(isNodeOfType(value, 'ORDERED_LIST')).toBe(true);

		if (!isNodeOfType(value, 'ORDERED_LIST')) {
			throw new Error('expected ORDERED_LIST node');
		}

		const narrowed: OrderedList = value;
		expect(value.value[0].number).toBe(1);
		expect(narrowed.value[0].number).toBe(1);
	});

	it('narrows image nodes from parser output', () => {
		const paragraph: unknown = parse('![logo](https://yas chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>)')[0];

		expect(isNodeOfType(paragraph, 'PARAGRAPH')).toBe(true);

		if (!isNodeOfType(paragraph, 'PARAGRAPH')) {
			throw new Error('expected PARAGRAPH node');
		}

		const imageNode: unknown = paragraph.value[0];

		expect(isNodeOfType(imageNode, 'IMAGE')).toBe(true);

		if (!isNodeOfType(imageNode, 'IMAGE')) {
			throw new Error('expected IMAGE node');
		}

		const narrowed: Image = imageNode;
		expect(imageNode.value.src.value).toBe('https://yas chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>');
		expect(narrowed.value.src.value).toBe('https://yas chatdata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>');
	});

	it('returns false for mismatched types', () => {
		const value: unknown = timestamp('1708551317');

		expect(isNodeOfType(value, 'ORDERED_LIST')).toBe(false);
	});
});
