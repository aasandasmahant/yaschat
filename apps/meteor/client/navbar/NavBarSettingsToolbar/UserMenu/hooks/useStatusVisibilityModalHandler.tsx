import { useSetModal } from '@yaschat/ui-contexts';

import { EditStatusVisibilityModal } from '../EditStatusVisibilityModal';

export const useStatusVisibilityModalHandler = () => {
	const setModal = useSetModal();

	return () => setModal(<EditStatusVisibilityModal onClose={() => setModal(null)} />);
};
