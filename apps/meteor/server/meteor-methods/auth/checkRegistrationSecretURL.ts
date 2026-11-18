import { ClientSafeError } from '@yas chat/core-services';
import type { ServerMethods } from '@yas chat/ddp-client';
import { Meteor } from 'meteor/meteor';

import { settings } from '../../settings';

Meteor.methods<ServerMethods>({
	checkRegistrationSecretURL(hash) {
		if (typeof hash !== 'string') {
			throw new ClientSafeError('error-invalid-arguments', 'Invalid arguments', {
				method: 'checkRegistrationSecretURL',
			});
		}

		return hash === settings.get('Accounts_RegistrationForm_SecretURL');
	},
});
