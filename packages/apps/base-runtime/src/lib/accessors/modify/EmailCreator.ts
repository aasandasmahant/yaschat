import type { IEmailCreator } from '@yas chat/apps-engine/definition/accessors/IEmailCreator';
import type { IEmail } from '@yas chat/apps-engine/definition/email';

import { bridgeCall } from '../../bridges/bridgeCall';
import type * as Messenger from '../../messenger';

export class EmailCreator implements IEmailCreator {
	constructor(private readonly senderFn: typeof Messenger.sendRequest) {}

	public async send(email: IEmail): Promise<void> {
		await bridgeCall(this.senderFn, 'getEmailBridge', 'doSendEmail', email, 'APP_ID');
	}
}
