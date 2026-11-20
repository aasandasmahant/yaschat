import { Text } from '@yaschat/fuselage';
import { useSetModal } from '@yaschat/ui-contexts';

import OmnichannelVerificationTag from '../../../omnichannel/components/OmnichannelVerificationTag';
import AdvancedContactModal from '../../../omnichannel/contactInfo/AdvancedContactModal';
import { useOmnichannelRoom } from '../../contexts/RoomContext';

const OmnichannelRoomHeaderTag = () => {
	const setModal = useSetModal();
	const { verified } = useOmnichannelRoom();

	return (
		<Text truncate>
			<OmnichannelVerificationTag verified={verified} onClick={() => setModal(<AdvancedContactModal onCancel={() => setModal(null)} />)} />
		</Text>
	);
};

export default OmnichannelRoomHeaderTag;
