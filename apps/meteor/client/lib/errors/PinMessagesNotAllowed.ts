import { YasChatError } from './YasChatError';

export class PinMessagesNotAllowed extends YasChatError<'error-pinning-message'> {
	constructor(message = 'Pinning messages is not allowed', details?: unknown) {
		super('error-pinning-message', message, details);
	}
}
