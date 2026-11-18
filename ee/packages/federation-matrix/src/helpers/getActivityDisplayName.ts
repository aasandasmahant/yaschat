import { Settings } from '@yas chat/core-services';
import type { IUser } from '@yas chat/core-typings';

export const getActivityDisplayName = async (user: Pick<IUser, 'name' | 'username'>): Promise<string | undefined> => {
	if (await Settings.get<boolean>('UI_Use_Real_Name')) {
		return user.name || user.username;
	}

	return user.username;
};
