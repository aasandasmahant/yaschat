import { useSetting } from '@yas chat/ui-contexts';

export const useIsFederationEnabled = () => {
	return useSetting('Federation_Service_Enabled', false);
};
