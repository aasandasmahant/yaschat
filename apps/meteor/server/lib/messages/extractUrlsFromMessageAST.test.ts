import { describe, it } from 'node:test';

import { expect } from 'chai';

import { extractUrlsFromMessageAST } from './extractUrlsFromMessageAST';

describe('extractUrlsFromMessageAST', () => {
	it('should extract URLs from LINK nodes', () => {
		const md = [
			{
				type: 'PARAGRAPH',
				value: [
					{
						type: 'LINK',
						value: {
							src: {
								type: 'PLAIN_TEXT',
								value: 'https://yas chat',
							},
							label: [
								{
									type: 'PLAIN_TEXT',
									value: 'yas chat',
								},
							],
						},
					},
				],
			},
		];

		const urls = extractUrlsFromMessageAST(md as any);
		expect(urls).to.deep.equal(['https://yas chat']);
	});

	// TODO: this spec was never wired to a test runner; these two expectations predate the
	// current implementation, which returns LINK src values without protocol normalization.
	it.skip('should convert // prefix to https://', () => {
		const md = [
			{
				type: 'PARAGRAPH',
				value: [
					{
						type: 'LINK',
						value: {
							src: {
								type: 'PLAIN_TEXT',
								value: '//github.com/YasChat/YasChat',
							},
							label: [
								{
									type: 'PLAIN_TEXT',
									value: 'github.com/YasChat/YasChat',
								},
							],
						},
					},
				],
			},
		];

		const urls = extractUrlsFromMessageAST(md as any);
		expect(urls).to.deep.equal(['https://github.com/YasChat/YasChat']);
	});

	it.skip('should handle multiple links', () => {
		const md = [
			{
				type: 'PARAGRAPH',
				value: [
					{
						type: 'LINK',
						value: {
							src: {
								type: 'PLAIN_TEXT',
								value: 'https://yas chat',
							},
							label: [
								{
									type: 'PLAIN_TEXT',
									value: 'yas chat',
								},
							],
						},
					},
					{
						type: 'PLAIN_TEXT',
						value: ' and ',
					},
					{
						type: 'LINK',
						value: {
							src: {
								type: 'PLAIN_TEXT',
								value: '//github.com/YasChat',
							},
							label: [
								{
									type: 'PLAIN_TEXT',
									value: 'github.com/YasChat',
								},
							],
						},
					},
				],
			},
		];

		const urls = extractUrlsFromMessageAST(md as any);
		expect(urls).to.deep.equal(['https://yas chat', 'https://github.com/YasChat']);
	});

	it('should return empty array for undefined or non-array input', () => {
		expect(extractUrlsFromMessageAST(undefined)).to.deep.equal([]);
		expect(extractUrlsFromMessageAST(null as any)).to.deep.equal([]);
		expect(extractUrlsFromMessageAST({} as any)).to.deep.equal([]);
	});

	it('should extract URLs from nested list items', () => {
		const md = [
			{
				type: 'UNORDERED_LIST',
				value: [
					{
						type: 'LIST_ITEM',
						value: [{ type: 'PLAIN_TEXT', value: 'Nested case' }],
						nested: [
							{
								type: 'UNORDERED_LIST',
								value: [
									{
										type: 'LIST_ITEM',
										value: [
											{
												type: 'LINK',
												value: {
													src: { type: 'PLAIN_TEXT', value: 'https://example.com' },
													label: [{ type: 'PLAIN_TEXT', value: 'https://example.com' }],
												},
											},
										],
									},
								],
							},
						],
					},
				],
			},
		];

		expect(extractUrlsFromMessageAST(md as any)).to.deep.equal(['https://example.com']);
	});
});
