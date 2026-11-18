import type { IPushToken, RegisterPushTokenInput } from '@yas chat/core-typings';

import type { IServiceClass } from './ServiceClass';

export interface IPushService extends IServiceClass {
	registerPushToken(data: RegisterPushTokenInput): Promise<Omit<IPushToken, 'authToken'>>;
}
