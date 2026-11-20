import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useHasLicenseModule, useLicense } from '@yaschat/ui-client';
import { useRole, useSetModal } from '@yaschat/ui-contexts';
import { useMemo } from 'react';

import OutboundMessageUpsellModal from './OutboundMessageUpsellModal';

export const useOutboundMessageUpsellModal = () => {
	const setModal = useSetModal();
	const isAdmin = useRole('admin');
	const license = useLicense();
	const { data: hasModule = false } = useHasLicenseModule('outbound-messaging');

	const close = useStableCallback(() => setModal(null));
	const open = useStableCallback(() =>
		setModal(<OutboundMessageUpsellModal isCommunity={!license.data?.license} isAdmin={isAdmin} hasModule={hasModule} onClose={close} />),
	);

	return useMemo(() => ({ open, close }), [open, close]);
};
