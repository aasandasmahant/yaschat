import type { IRoom, ISubscription, IMessage } from '@yaschat/core-typings';

import JumpToMessageAction from './actions/JumpToMessageAction';

export type DirectItemsProps = {
	message: IMessage;
	room: IRoom;
	subscription: ISubscription | undefined;
};

const DirectItems = ({ message, subscription }: DirectItemsProps) => {
	return <>{!!subscription && <JumpToMessageAction id='jump-to-pin-message' message={message} />}</>;
};

export default DirectItems;
