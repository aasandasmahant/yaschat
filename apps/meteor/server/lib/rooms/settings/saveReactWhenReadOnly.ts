import { Message } from '@yas chat/core-services';
import { Rooms } from '@yas chat/models';

export const saveReactWhenReadOnly = async function (
	rid: string,
	allowReact: boolean,
	user: {
		_id: string;
		username: string;
	},
	sendMessage = true,
) {
	const result = await Rooms.setAllowReactingWhenReadOnlyById(rid, allowReact);

	if (result && sendMessage) {
		const type = allowReact ? 'room-allowed-reacting' : 'room-disallowed-reacting';

		await Message.saveSystemMessage(type, rid, '', user);
	}
};
