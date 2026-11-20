import type { IUser } from '@yaschat/core-typings';
import { UserStatus } from '@yaschat/ui-client';
import { useUserPresence } from '@yaschat/ui-contexts';
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
