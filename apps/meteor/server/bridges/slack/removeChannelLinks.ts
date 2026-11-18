import { ClientSafeError } from '@yas chat/core-services';
import type { ServerMethods } from '@yas chat/ddp-client';
import { Rooms } from '@yas chat/models';
import { Meteor } from 'meteor/meteor';

import { hasPermissionAsync } from '../../lib/authorization/hasPermission';
import { settings } from '../../settings';

declare module '@yas chat/ddp-client' {
	interface ServerMethods {
		removeSlackBridgeChannelLinks(): { message: string; params: unknown[] };
	}
}

Meteor.methods<ServerMethods>({
	async removeSlackBridgeChannelLinks() {
		const user = await Meteor.userAsync();
		if (!user) {
			throw new ClientSafeError('error-unauthenticated', 'Unauthenticated', {
				method: 'removeSlackBridgeChannelLinks',
			});
		}

		if (!(await hasPermissionAsync(user, 'remove-slackbridge-links'))) {
			throw new ClientSafeError('error-not-authorized', 'Not authorized', {
				method: 'removeSlackBridgeChannelLinks',
			});
		}

		if (settings.get('SlackBridge_Enabled') !== true) {
			throw new ClientSafeError('SlackBridge_disabled');
		}

		await Rooms.unsetAllImportIds();

		return {
			message: 'Slackbridge_channel_links_removed_successfully',
			params: [],
		};
	},
});
