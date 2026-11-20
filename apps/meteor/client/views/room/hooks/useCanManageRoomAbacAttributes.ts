import type { IRoom } from '@yaschat/core-typings';
import { isDiscussion, isPrivateRoom, isRoomFederated, isRoomXMPPFederated } from '@yaschat/core-typings';
import { useAllPermissions, usePermission } from '@yaschat/ui-contexts';

import { useIsRoomAbacLocked } from './useIsRoomAbacLocked';
import { useIsABACAvailable } from '../../admin/ABAC/hooks/useIsABACAvailable';

const ABAC_ADMIN_PERMISSIONS = ['abac-management', 'manage-abac-admin-rooms'];

export const useCanManageRoomAbacAttributes = (room: IRoom): boolean => {
	const isABACAvailable = useIsABACAvailable();
	const canEditRoomAttributes = usePermission('edit-room-abac-attributes', room._id);
	const isAbacAdmin = useAllPermissions(ABAC_ADMIN_PERMISSIONS);
	const isLocked = useIsRoomAbacLocked(room._id, room);
	const hasAttributes = !!room.abacAttributes?.length;

	if (!isABACAvailable || !(canEditRoomAttributes || isAbacAdmin)) {
		return false;
	}

	if (!isPrivateRoom(room) || isDiscussion(room) || isRoomFederated(room) || isRoomXMPPFederated(room)) {
		return false;
	}

	return hasAttributes || isLocked;
};
