import type { LicenseModule } from '@yas chat/core-typings';

import { useLicenseBase } from './useLicense';

export const useHasLicenseModule = (licenseName: LicenseModule | undefined) =>
	useLicenseBase({
		select: (data) => !!licenseName && data.license.activeModules.includes(licenseName),
	});
