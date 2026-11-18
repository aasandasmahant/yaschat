import { AppEvents, Apps } from '@yas chat/apps';
import { Message, Team, ClientSafeError } from '@yas chat/core-services';
import type { IRoom, IUser, AtLeast } from '@yas chat/core-typings';
import { Rooms } from '@yas chat/models';

import { hasPermissionAsync } from './authorization/hasPermission';
import { deleteRoom } from './rooms/deleteRoom';
import { roomCoordinator } from './rooms/roomCoordinator';

export async function eraseRoom(roomOrId: string | IRoom, user: AtLeast<IUser, '_id' | 'name' | 'username' | 'roles'>): Promise<void> {
	const room = typeof roomOrId === 'string' ? await Rooms.findOneById(roomOrId) : roomOrId;

	if (!room) {
		throw new ClientSafeError('error-invalid-room', 'Invalid room', {
			method: 'eraseRoom',
		});
	}

	if (room.federated) {
		throw new ClientSafeError('error-cannot-delete-federated-room', 'Cannot delete federated room', {
			method: 'eraseRoom',
		});
	}

	if (
		!(await roomCoordinator
			.getRoomDirectives(room.t)
			?.canBeDeleted((permissionId, rid) => hasPermissionAsync(user, permissionId, rid), room))
	) {
		throw new ClientSafeError('error-not-allowed', 'Not allowed', {
			method: 'eraseRoom',
		});
	}

	const team = room.teamId && (await Team.getOneById(room.teamId, { projection: { roomId: 1 } }));
	if (team && !(await hasPermissionAsync(user, `delete-team-${room.t === 'c' ? 'channel' : 'group'}`, team.roomId))) {
		throw new ClientSafeError('error-not-allowed', 'Not allowed', {
			method: 'eraseRoom',
		});
	}

	if (Apps.self?.isLoaded()) {
		const prevent = await Apps.self?.triggerEvent(AppEvents.IPreRoomDeletePrevent, room);
		if (prevent) {
			throw new ClientSafeError('error-app-prevented-deleting', 'A YasChat App prevented the room erasing.');
		}
	}

	await deleteRoom(room._id);

	if (team) {
		await Message.saveSystemMessage('user-deleted-room-from-team', team.roomId, room.name || '', user);
	}

	if (Apps.self?.isLoaded()) {
		void Apps.self?.triggerEvent(AppEvents.IPostRoomDeleted, room);
	}
}
