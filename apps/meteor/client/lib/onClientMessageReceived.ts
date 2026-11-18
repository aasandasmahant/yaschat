import type { IMessage } from '@yas chat/core-typings';

import { createAsyncTransformChain } from './transforms';

export const onClientMessageReceived = createAsyncTransformChain<IMessage>();
