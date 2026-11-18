import type { ICallHistorySearchResult } from '@yas chat/apps-engine/definition/accessors';
import type { ICallHistoryItem } from '@yas chat/apps-engine/definition/mediaCalls';

import { CallHistoryBridge } from '../../../src/server/bridges';

export class TestsCallHistoryBridge extends CallHistoryBridge {
	public getById(id: string, uid: string, appId: string): Promise<ICallHistoryItem | undefined> {
		throw new Error('Method not implemented.');
	}

	public getByCallId(callId: string, uid: string, appId: string): Promise<ICallHistoryItem | undefined> {
		throw new Error('Method not implemented.');
	}

	public search(uid: string): Promise<ICallHistorySearchResult> {
		throw new Error('Method not implemented.');
	}
}
