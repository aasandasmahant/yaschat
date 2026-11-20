import { useHasLicenseModule } from '@yaschat/ui-client';
import { useSetting } from '@yaschat/ui-contexts';

export const useIsABACAvailable = () => {
	const { data: hasABAC = false } = useHasLicenseModule('abac');
	const isABACSettingEnabled = useSetting('ABAC_Enabled', false);

	return hasABAC && isABACSettingEnabled;
};
