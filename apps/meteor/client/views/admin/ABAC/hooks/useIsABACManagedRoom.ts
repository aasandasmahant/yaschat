import type { IRoom } from '@yas chat/core-typings';
import { isABACManagedRoom } from '@yas chat/core-typings';

import { useIsABACAvailable } from './useIsABACAvailable';

export const useIsABACManagedRoom = (room: Partial<IRoom>): boolean => {
	const isABACAvailable = useIsABACAvailable();
	return isABACAvailable && isABACManagedRoom(room);
};
