import type { IRoom, ISubscription, IMessage } from '@yas chat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type MentionsItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const MentionsItems = ({ message }: MentionsItemsProps) => {
	return (
		<>
			<JumpToMessageAction id='jump-to-message' message={message} />
		</>
	);
};

export default MentionsItems;
