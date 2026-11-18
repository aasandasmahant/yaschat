import { type EventID } from '@yas chat/federation-sdk';
import { Logger } from '@yas chat/logger';
import { Messages } from '@yas chat/models';

// TODO replace by a reusable logger
const logger = new Logger('federation-matrix:message');

export async function getThreadMessageId(threadRootEventId: EventID): Promise<{ tmid: string; tshow: boolean } | undefined> {
	const threadRootMessage = await Messages.findOneByFederationId(threadRootEventId);
	if (!threadRootMessage) {
		logger.warn({ msg: 'Thread root message not found for event', eventId: threadRootEventId });
		return;
	}

	const shouldSetTshow = !threadRootMessage?.tcount;
	return { tmid: threadRootMessage._id, tshow: shouldSetTshow };
}
