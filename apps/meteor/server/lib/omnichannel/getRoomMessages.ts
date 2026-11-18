import { ClientSafeError } from '@yas chat/core-services';
import type { MessageTypesValues, IRoom } from '@yas chat/core-typings';
import { Rooms, Messages } from '@yas chat/models';

export async function getRoomMessages({ rid }: { rid: string }) {
	const room = await Rooms.findOneById<Pick<IRoom, 't'>>(rid, { projection: { t: 1 } });
	if (room?.t !== 'l') {
		throw new ClientSafeError('invalid-room');
	}

	const ignoredMessageTypes: MessageTypesValues[] = [
		'livechat_navigation_history',
		'livechat_transcript_history',
		'command',
		'livechat-close',
		'livechat-started',
		'livechat_video_call',
	];

	return Messages.findVisibleByRoomIdNotContainingTypes(rid, ignoredMessageTypes, {
		sort: { ts: 1 },
	});
}
