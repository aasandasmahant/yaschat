import client from '@yas chat/jest-presets/client';
import server from '@yas chat/jest-presets/server';
import type { Config } from 'jest';

export default {
	projects: [
		{
			displayName: 'client',
			preset: client.preset,
			testMatch: ['<rootDir>/src/**/*.client.spec.[jt]s?(x)'],
		},
		{
			displayName: 'server',
			preset: server.preset,
			testMatch: ['<rootDir>/src/**/*.server.spec.[jt]s?(x)'],
		},
	],
} satisfies Config;
