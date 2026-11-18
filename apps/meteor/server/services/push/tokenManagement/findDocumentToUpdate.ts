import type { IPushToken } from '@yas chat/core-typings';
import { PushToken } from '@yas chat/models';

export async function findDocumentToUpdate(data: Partial<IPushToken>): Promise<IPushToken | null> {
	if (data._id) {
		const existingDoc = await PushToken.findOneById(data._id);
		if (existingDoc) {
			return existingDoc;
		}
	}

	if (data.tokenValue && data.appName) {
		return PushToken.findOneByTokenAndAppName(data.tokenValue, data.appName);
	}

	return null;
}
