import type { AtLeast, IMessage } from '@yas chat/core-typings';

import { createAsyncTransformChain } from './transforms';

export const onClientBeforeSendMessage = createAsyncTransformChain<AtLeast<IMessage, '_id' | 'rid' | 'msg'> & { isEditing?: boolean }>();
