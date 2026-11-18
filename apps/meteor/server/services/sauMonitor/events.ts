import { Emitter } from '@yas chat/emitter';

export const sauEvents = new Emitter<{
	'sau.accounts.login': {
		userId: string;
		instanceId: string;
		connectionId: string;
		loginToken?: string;
		clientAddress: string;
		userAgent: string;
		host: string;
	};
	'sau.accounts.logout': { userId: string; sessionId: string };
	'sau.socket.connected': { instanceId: string; connectionId: string };
	'sau.socket.disconnected': { instanceId: string; connectionId: string };
}>();
