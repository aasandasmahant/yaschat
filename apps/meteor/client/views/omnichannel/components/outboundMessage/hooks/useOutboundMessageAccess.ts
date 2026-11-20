import { useHasLicenseModule } from '@yaschat/ui-client';
import { usePermission } from '@yaschat/ui-contexts';

import { useOmnichannelEnabled } from '../../../hooks/useOmnichannelEnabled';

export const useOutboundMessageAccess = (): boolean => {
	const isOmnichannelEnabled = useOmnichannelEnabled();
	const { data: hasOmnichannelModule = false } = useHasLicenseModule('livechat-enterprise');
	const { data: hasOutboundModule = false } = useHasLicenseModule('outbound-messaging');
	const hasPermission = usePermission('outbound.send-messages');

	if (!isOmnichannelEnabled) {
		return false;
	}

	if (!hasOmnichannelModule || !hasOutboundModule) {
		return true;
	}

	return hasPermission;
};
