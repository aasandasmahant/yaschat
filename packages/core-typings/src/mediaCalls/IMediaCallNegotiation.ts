import type { IYasChatRecord } from '../IYasChatRecord';
import type { RTCSessionDescriptionInit } from './RTCSessionDescription';

export type MediaCallNegotiationStream = {
	tag: string;
	id: string;
};

export interface IMediaCallNegotiation extends IYasChatRecord {
	callId: string;

	offerer: 'caller' | 'callee';

	requestTimestamp: Date;
	offerTimestamp?: Date;
	answerTimestamp?: Date;
	stableTimestamp?: Date;

	offer?: RTCSessionDescriptionInit;
	answer?: RTCSessionDescriptionInit;

	offerStreams?: MediaCallNegotiationStream[];
	answerStreams?: MediaCallNegotiationStream[];
}
