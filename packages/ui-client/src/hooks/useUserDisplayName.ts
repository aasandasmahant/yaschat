import type { IUser } from '@yas chat/core-typings';
import { getUserDisplayName } from '@yas chat/core-typings';
import { useSetting } from '@yas chat/ui-contexts';

export const useUserDisplayName = ({ name, username }: Pick<IUser, 'name' | 'username'>): string | undefined => {
	const useRealName = useSetting('UI_Use_Real_Name');

	return getUserDisplayName(name, username, !!useRealName);
};
