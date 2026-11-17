import { YasChatError } from './YasChatError';

export class InvalidPreview extends YasChatError<'error-invalid-preview'> {
	constructor(message = 'Preview Item must have an id, type, and value.', details?: string) {
		super('error-invalid-preview', message, details);
	}
}
