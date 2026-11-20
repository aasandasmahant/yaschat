import { useSetModal } from '@yaschat/ui-contexts';

import EditStatusModal from '../EditStatusModal';

export const useCustomStatusModalHandler = () => {
	const setModal = useSetModal();

	return () => {
		const handleModalClose = () => setModal(null);
		setModal(<EditStatusModal onClose={handleModalClose} />);
	};
};
