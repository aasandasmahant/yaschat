import type { OffCallbackHandler } from '@yas chat/emitter';
import { useContext } from 'react';

import { UserContext } from '../UserContext';

export const useOnLogout = (): ((callback: () => void) => OffCallbackHandler) => useContext(UserContext).onLogout;
