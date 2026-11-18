import type { IUser } from '@yas chat/core-typings';
import { UserStatus } from '@yas chat/ui-client';
import { useUserPresence } from '@yas chat/ui-contexts';
import type { ComponentProps } from 'react';
import { memo } from 'react';

export type ReactiveUserStatusProps = {
	uid: IUser['_id'];
} & ComponentProps<typeof UserStatus.UserStatus>;

const ReactiveUserStatus = ({ uid, ...props }: ReactiveUserStatusProps) => {
	const status = useUserPresence(uid)?.status;
	return <UserStatus.UserStatus status={status} {...props} />;
};

export default memo(ReactiveUserStatus);
