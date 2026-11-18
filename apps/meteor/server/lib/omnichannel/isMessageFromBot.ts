import type { IMessage, IUser } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';

export async function isMessageFromBot(message: IMessage): Promise<Pick<IUser, '_id' | 'roles'> | null> {
	return Users.isUserInRole(message.u._id, 'bot');
}
