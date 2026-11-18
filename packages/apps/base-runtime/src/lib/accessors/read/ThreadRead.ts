import type { IThreadRead } from '@yas chat/apps-engine/definition/accessors/IThreadRead';
import type { IMessage } from '@yas chat/apps-engine/definition/messages';

import { bridgeCall } from '../../bridges/bridgeCall';
import type * as Messenger from '../../messenger';

export class ThreadRead implements IThreadRead {
	constructor(private readonly senderFn: typeof Messenger.sendRequest) {}

	public async getThreadById(id: string): Promise<Array<IMessage> | undefined> {
		const messages = await bridgeCall<Array<IMessage> | null>(this.senderFn, 'getThreadBridge', 'doGetById', id, 'APP_ID');

		return messages ?? undefined;
	}
}
