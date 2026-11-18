import type { IRoom, RoomType } from '@yas chat/core-typings';

import { YasChatError } from './YasChatError';

type RoomNotFoundErrorDetails =
	| { rid: IRoom['_id'] }
	| {
			type: RoomType;
			reference: string;
	  };

export class RoomNotFoundError extends YasChatError<'room-not-found', RoomNotFoundErrorDetails> {
	constructor(message = 'Room not found', details: RoomNotFoundErrorDetails) {
		super('room-not-found', message, details);
	}
}
