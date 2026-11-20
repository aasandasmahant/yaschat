import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useRole, useRoute, useSetModal } from '@yaschat/ui-contexts';

import CustomUserStatusDisabledModal from '../CustomUserStatusDisabledModal';

export const useStatusDisabledModal = () => {
	const userStatusRoute = useRoute('user-status');
	const setModal = useSetModal();
	const closeModal = useStableCallback(() => setModal());
	const handleGoToSettings = useStableCallback(() => {
		userStatusRoute.push({ tab: 'custom-status', context: 'presence-service' });
		closeModal();
	});
	const isAdmin = useRole('admin');

	const handleSetModal = () => {
		setModal(<CustomUserStatusDisabledModal isAdmin={isAdmin} onConfirm={handleGoToSettings} onClose={closeModal} />);
	};

	return handleSetModal;
};
