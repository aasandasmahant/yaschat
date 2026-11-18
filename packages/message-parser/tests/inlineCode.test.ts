import { inlineCode, paragraph, plain } from './helpers.js';
import { parse } from '../src/index.js';

test.each([
	['`[asd](https://localhost)`', [paragraph([inlineCode(plain('[asd](https://localhost)'))])]],
	[`\`code\``, [paragraph([inlineCode(plain('code'))])]],
	[`File extension (\`.mov\`)`, [paragraph([plain('File extension ('), inlineCode(plain('.mov')), plain(')')])]],
	['`@yas chat`', [paragraph([inlineCode(plain('@yas chat'))])]],
	['`@yas chat/message-parser`', [paragraph([inlineCode(plain('@yas chat/message-parser'))])]],
])('parses %p', (input, output) => {
	expect(parse(input)).toEqual(output);
});
