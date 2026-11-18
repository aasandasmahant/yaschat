import type { IUser } from '@yas chat/core-typings';
import { useUserPresence } from '@yas chat/ui-contexts';
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
