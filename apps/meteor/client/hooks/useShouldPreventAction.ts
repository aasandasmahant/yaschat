import type { LicenseLimitKind } from '@yas chat/core-typings';
import { useLicense } from '@yas chat/ui-client';

export const useShouldPreventAction = (action: LicenseLimitKind): boolean => {
	const { data: { preventedActions } = {} } = useLicense();

	return Boolean(preventedActions?.[action]);
};
