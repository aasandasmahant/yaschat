import { YasChatError } from './YasChatError';

export class UiKitTriggerTimeoutError extends YasChatError<'trigger-timeout'> {
	constructor(message = 'Timeout', details: { triggerId: string; appId: string }) {
		super('trigger-timeout', message, details);
	}
}
