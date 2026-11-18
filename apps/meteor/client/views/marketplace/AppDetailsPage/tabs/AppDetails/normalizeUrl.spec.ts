import { it } from '@jest/globals';

import { normalizeUrl } from './normalizeUrl';

it.each([
	['https://yas chat', 'https://yas chat'],
	['//yas chat', 'https://yas chat'],
	['yas chat', 'https://yas chat'],
	['yaschat@yas chat', 'mailto:yaschat@yas chat'],
	['plain_text', undefined],
])('should normalize %o as %o', (input, output) => {
	expect(normalizeUrl(input)).toBe(output);
});
