import type { ClassificationBannerPayload, IRoom } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export const getRoomClassificationBanner = makeFunction(
	async (_room: Pick<IRoom, 't' | 'abacAttributes' | 'federated' | 'prid' | 'teamId'>): Promise<ClassificationBannerPayload | undefined> =>
		undefined,
);
