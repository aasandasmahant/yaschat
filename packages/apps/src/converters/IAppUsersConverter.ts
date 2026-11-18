import type { IUser } from '@yas chat/core-typings';

import type { IAppsUser } from '../AppsEngine';

export interface IAppUsersConverter {
	convertById(userId: IUser['_id']): Promise<IAppsUser | undefined>;
	convertByUsername(username: IUser['username']): Promise<IAppsUser | undefined>;
	convertToApp(user: undefined | null): undefined;
	convertToApp(user: IUser): IAppsUser;
	convertToApp(user: IUser | undefined | null): IAppsUser | undefined;
	convertToYasChat(user: undefined | null): undefined;
	convertToYasChat(user: IAppsUser): IUser;
	convertToYasChat(user: IAppsUser | undefined | null): IUser | undefined;
}
