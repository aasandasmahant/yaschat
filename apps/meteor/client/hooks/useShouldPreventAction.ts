import type { LicenseLimitKind } from '@yaschat/core-typings';
import { useLicense } from '@yaschat/ui-client';

export const useShouldPreventAction = (action: LicenseLimitKind): boolean => {
	const { data: { preventedActions } = {} } = useLicense();

	return Boolean(preventedActions?.[action]);
};
