import { ReadReceipts, ReadReceiptsArchive } from '@yas chat/models';

import { callbacks } from '../../../../server/lib/callbacks';

callbacks.add(
	'afterDeleteRoom',
	async (rid) => {
		await ReadReceipts.removeByRoomId(rid);
		await ReadReceiptsArchive.removeByRoomId(rid);
		return rid;
	},
	callbacks.priority.LOW,
	'DeleteReadReceipts',
);
