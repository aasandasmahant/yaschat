import type { IOutboundMessageProviderService } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';

export const getOutboundService = makeFunction((): IOutboundMessageProviderService => {
	throw new Error('error-no-license');
});
