import type { IUser } from '@yas chat/apps-engine/definition/users';

type ClientUserInfo = Pick<IUser, 'id' | 'username'>;

/**
 * Represents the user's information returned to
 * the external component.
 */
export interface IExternalComponentUserInfo extends ClientUserInfo {
	/**
	 * the avatar URL of the YasChat user
	 */
	avatarUrl: string;
}
