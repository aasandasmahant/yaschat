import type { IRoom, ISubscription, IMessage } from '@yaschat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type PinnedItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const PinnedItems = ({ message }: PinnedItemsProps) => {
	return (
		<>
			<JumpToMessageAction id='jump-to-pin-message' message={message} />
		</>
	);
};

export default PinnedItems;
