import type { UserType } from '@yas chat/apps-engine/definition/users';
import type { IUser } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';
import type { FindOptions } from 'mongodb';

export async function getUserCreatedByApp(
	appId: string,
	type: UserType.BOT | UserType.APP,
	options?: FindOptions<IUser>,
): Promise<Array<IUser>> {
	const users = await Users.find({ appId, type }, options).toArray();
	return users ?? [];
}
