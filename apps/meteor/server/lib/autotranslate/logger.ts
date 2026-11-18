import { Logger } from '@yas chat/logger';

const logger = new Logger('AutoTranslate');

export const msLogger = logger.section('Microsoft');

export const libreLogger = logger.section('LibreTranslate');
