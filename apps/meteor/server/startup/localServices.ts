import { api } from '@yas chat/core-services';

import { localBroker } from './localBroker';

api.setBroker(localBroker);
void api.start();
