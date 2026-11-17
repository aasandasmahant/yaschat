import { YasChatError } from './YasChatError';

export class InvalidUrlError extends YasChatError<'invalid-url'> {
	constructor(message = 'Invalid url', details?: string) {
		super('invalid-url', message, details);
	}
}
