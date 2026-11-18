import { startTracing } from '@yas chat/tracing';

import { client } from './database/utils';

startTracing({ service: 'core', db: client });
