import type { IUser } from '@yaschat/core-typings';
import { useUserPresence } from '@yaschat/ui-contexts';
import { memo } from 'react';

import UserStatusText from './UserStatusText';

export type ReactiveUserStatusTextProps = {
	uid: IUser['_id'];
};

const ReactiveUserStatusText = ({ uid }: ReactiveUserStatusTextProps) => {
	const presence = useUserPresence(uid);
	return <UserStatusText status={presence?.status} statusText={presence?.statusText} statusExpiresAt={presence?.statusExpiresAt} />;
};

export default memo(ReactiveUserStatusText);
