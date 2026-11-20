import type { LicenseLimitKind } from '@yaschat/core-typings';

type Limits = Record<
	LicenseLimitKind,
	{
		max: number;
		value?: number;
	}
>;

export const isOverLicenseLimits = (limits: Limits): boolean =>
	Object.values(limits).some((limit) => limit.value !== undefined && limit.max > 0 && limit.value > limit.max);
