import type { IEmail } from '@yas chat/apps-engine/definition/email';

import { EmailBridge } from '../../../src/server/bridges/EmailBridge';

export class TestsEmailBridge extends EmailBridge {
	protected sendEmail(email: IEmail, appId: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
