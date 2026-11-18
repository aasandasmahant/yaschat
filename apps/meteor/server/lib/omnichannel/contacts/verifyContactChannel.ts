import type { ILivechatContact } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export type VerifyContactChannelParams = {
	contactId: string;
	field: string;
	value: string;
	visitorId: string;
	roomId: string;
};

export const verifyContactChannel = makeFunction(async (_params: VerifyContactChannelParams): Promise<ILivechatContact | null> => null);
