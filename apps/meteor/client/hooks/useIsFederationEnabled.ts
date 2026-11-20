import { useSetting } from '@yaschat/ui-contexts';

export const useIsFederationEnabled = () => {
	return useSetting('Federation_Service_Enabled', false);
};
