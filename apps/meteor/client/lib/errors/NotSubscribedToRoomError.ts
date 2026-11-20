import type { IRoom } from '@yaschat/core-typings';

import { YasChatError } from './YasChatError';

type NotSubscribedToRoomErrorDetails = { rid: IRoom['_id'] };

export class NotSubscribedToRoomError extends YasChatError<'not-subscribed-room', NotSubscribedToRoomErrorDetails> {
	declare public readonly reason: string;

	declare public readonly details: NotSubscribedToRoomErrorDetails;

	constructor(message = 'Not subscribed to this room', details: NotSubscribedToRoomErrorDetails) {
		super('not-subscribed-room', message, details);
	}
}
