import type { OutgoingIntegrationEvent } from './IIntegration';
import type { IMessage } from './IMessage';
import type { IYasChatRecord } from './IYasChatRecord';

export interface IIntegrationHistory extends IYasChatRecord {
	type: string;
	step: string;
	integration: {
		_id: string;
	};
	event: OutgoingIntegrationEvent;
	_createdAt: Date;
	data?: {
		user?: any;
		room?: any;
		owner?: any;
		message_id?: string;
		channel_id?: string;
		user_id?: string;
	};
	ranPrepareScript: boolean;
	finished: boolean;

	triggerWord?: string;
	prepareSentMessage?: { channel: string; message: Partial<IMessage> }[];
	processSentMessage?: { channel: string; message: Partial<IMessage> }[];
	url?: string;
	httpCallData?: Record<string, any>;
	httpError?: any;
	httpResult?: string;
	error?: any;
	errorStack?: any;
}
