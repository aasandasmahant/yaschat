import { useHasLicenseModule } from '@yas chat/ui-client';
import { useSetting } from '@yas chat/ui-contexts';

export const useIsABACAvailable = () => {
	const { data: hasABAC = false } = useHasLicenseModule('abac');
	const isABACSettingEnabled = useSetting('ABAC_Enabled', false);

	return hasABAC && isABACSettingEnabled;
};
