import { useRoomToolbox } from '@yas chat/ui-contexts';

import Thread from './Thread';
import ThreadList from './ThreadList';

const Threads = () => {
	const { context: tmid } = useRoomToolbox();

	if (tmid) {
		return <Thread tmid={tmid} />;
	}

	return <ThreadList />;
};

export default Threads;
