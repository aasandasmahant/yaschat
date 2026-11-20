import type { GenericMenuItemProps } from '@yaschat/ui-client';
import { useSetModal } from '@yaschat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { TimestampPickerModal } from '../../../../../../components/message/toolbar/items/actions/Timestamp/TimestampPicker/TimestampPickerModal';
import type { ComposerAPI } from '../../../../../../lib/chats/ChatAPI';

export const useTimestampAction = (disabled: boolean, composer: ComposerAPI | undefined): GenericMenuItemProps | undefined => {
	const setModal = useSetModal();
	const { t } = useTranslation();

	const handleClick = () => {
		if (!composer) {
			return;
		}

		setModal(<TimestampPickerModal onClose={() => setModal(null)} composer={composer} />);
	};

	return {
		id: 'timestamp',
		icon: 'clock',
		content: t('Timestamp'),
		onClick: handleClick,
		disabled,
	};
};
