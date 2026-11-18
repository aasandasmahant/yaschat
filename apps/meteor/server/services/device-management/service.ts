import type { IDeviceManagementService } from '@yas chat/core-services';
import { ServiceClassInternal } from '@yas chat/core-services';
import { getHeader } from '@yas chat/tools';

import { deviceManagementEvents } from './events';

export class DeviceManagementService extends ServiceClassInternal implements IDeviceManagementService {
	protected name = 'device-management';

	constructor() {
		super();

		this.onEvent('accounts.login', async ({ userId, connection }) => {
			if (!connection.loginToken) {
				deviceManagementEvents.emit('device-login', {
					userId,
					userAgent: getHeader(connection.httpHeaders, 'user-agent'),
					clientAddress: connection.clientAddress || getHeader(connection.httpHeaders, 'x-real-ip'),
				});
			}
		});
	}
}
