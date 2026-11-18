import { Presence } from '@yas chat/core-services';
import { UserStatus } from '@yas chat/core-typings';
import type { ServerMethods } from '@yas chat/ddp-client';
import { Meteor } from 'meteor/meteor';

declare module '@yas chat/ddp-client' {
	interface ServerMethods {
		'UserPresence:online'(): boolean | undefined;
		'UserPresence:away'(): boolean | undefined;
	}
}

Meteor.methods<ServerMethods>({
	'UserPresence:online'() {
		const { userId, connection } = this;
		if (!userId || !connection) {
			return;
		}
		return Presence.setConnectionStatus(userId, UserStatus.ONLINE, connection.id);
	},
	'UserPresence:away'() {
		const { userId, connection } = this;
		if (!userId || !connection) {
			return;
		}
		return Presence.setConnectionStatus(userId, UserStatus.AWAY, connection.id);
	},
});
