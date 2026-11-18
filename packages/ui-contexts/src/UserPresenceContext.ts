import type { UserPresence } from '@yas chat/core-typings';
import { createContext } from 'react';

export type UserPresenceContextValue = {
	queryUserData: (uid: string | undefined) => {
		get(): UserPresence | undefined;
		subscribe(callback: () => void): () => void;
	};
};

export const UserPresenceContext = createContext<UserPresenceContextValue>({
	queryUserData: () => ({ get: () => undefined, subscribe: () => () => undefined }),
});
