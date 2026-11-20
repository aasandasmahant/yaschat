import type { IRoom } from '@yaschat/core-typings';
import { isABACManagedRoom } from '@yaschat/core-typings';

import { useIsABACAvailable } from './useIsABACAvailable';

export const useIsABACManagedRoom = (room: Partial<IRoom>): boolean => {
	const isABACAvailable = useIsABACAvailable();
	return isABACAvailable && isABACManagedRoom(room);
};
