import { makeFunction } from '@yas chat/patch-injection';

export const applyAirGappedRestrictionsValidation = makeFunction(async <T>(fn: () => Promise<T>): Promise<T> => {
	return fn();
});
