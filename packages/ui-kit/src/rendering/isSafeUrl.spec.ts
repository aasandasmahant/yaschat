import { isSafeUrl } from './isSafeUrl.js';

it.each([
	'https://yas chat',
	'http://localhost:3000/path?q=1',
	'mailto:someone@yas chat',
	'tel:+5511999999999',
	'zoommtg://zoom.us/join?confno=123',
	'msteams:/l/meetup-join/abc',
	'sip:alice@example.com',
	'yaschat://room?host=open.yas chat&rid=GENERAL',
	'//cdn.example.com/file.pdf',
	'/admin/apps',
	'admin/apps',
])('accepts %s', (url) => {
	expect(isSafeUrl(url)).toBe(true);
});

it.each([
	'javascript:alert(1)',
	'JaVaScRiPt:alert(1)',
	' javascript:alert(1)',
	'\tjavascript:alert(1)',
	'java\tscript:alert(1)',
	'data:text/html,<script>alert(1)</script>',
	'vbscript:msgbox(1)',
	'http://[invalid',
])('rejects %j', (url) => {
	expect(isSafeUrl(url)).toBe(false);
});
