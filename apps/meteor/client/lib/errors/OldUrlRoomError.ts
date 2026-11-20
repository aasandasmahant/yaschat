import type { IRoom, RoomType } from '@yaschat/core-typings';

import { YasChatError } from './YasChatError';

type OldUrlRoomErrorDetails =
	| { rid: IRoom['_id'] }
	| {
			type: RoomType;
			reference: string;
	  };

export class OldUrlRoomError extends YasChatError<'old-url-format', OldUrlRoomErrorDetails> {
	constructor(message = 'Old Url Format', details: OldUrlRoomErrorDetails) {
		super('old-url-format', message, details);
	}
}
