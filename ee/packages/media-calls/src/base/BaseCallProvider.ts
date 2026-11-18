import type { IMediaCall } from '@yas chat/core-typings';
import type { ClientMediaSignalBody } from '@yas chat/media-signaling';

import { logger } from '../logger';

export class BaseCallProvider {
	public get callId(): string {
		return this.call._id;
	}

	constructor(public readonly call: IMediaCall) {}

	public async reactToCallChanges(params: { dtmf?: ClientMediaSignalBody<'dtmf'> }): Promise<void> {
		logger.debug({ msg: 'BaseCallProvider.reactToCallChanges', callId: this.callId, params });
	}
}
