import type { IOmnichannelRoom, IUser } from '@yas chat/core-typings';

export interface IAuthorizationLivechat {
	canAccessRoom: (room: IOmnichannelRoom, user?: Pick<IUser, '_id'>, extraData?: Record<string, any>) => Promise<boolean>;
}
