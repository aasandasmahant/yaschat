import { YasChatError } from './YasChatError';

export class InvalidCommandUsage extends YasChatError<'invalid-command-usage'> {
	constructor(message = 'Executing a command requires at least a message with a room id.', details?: string) {
		super('invalid-command-usage', message, details);
	}
}
