import { it } from '@jest/globals';

import { normalizeUrl } from './normalizeUrl';

it.each([
	['https://rocket.chat', 'https://rocket.chat'],
	['//rocket.chat', 'https://rocket.chat'],
	['rocket.chat', 'https://rocket.chat'],
	['yaschat@rocket.chat', 'mailto:yaschat@rocket.chat'],
	['plain_text', undefined],
])('should normalize %o as %o', (input, output) => {
	expect(normalizeUrl(input)).toBe(output);
});
