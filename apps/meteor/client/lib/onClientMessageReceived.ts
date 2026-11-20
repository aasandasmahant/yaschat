import type { IMessage } from '@yaschat/core-typings';

import { createAsyncTransformChain } from './transforms';

export const onClientMessageReceived = createAsyncTransformChain<IMessage>();
