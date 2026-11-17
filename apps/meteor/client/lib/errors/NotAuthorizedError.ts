import { YasChatError } from './YasChatError';

export class NotAuthorizedError extends YasChatError<'not-authorized'> {
	constructor(message = 'Not authorized', details?: unknown) {
		super('not-authorized', message, details);
	}
}
