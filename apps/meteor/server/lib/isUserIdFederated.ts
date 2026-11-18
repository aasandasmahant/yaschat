import { isUserFederated } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';

export const isUserIdFederated = async (userId: string): Promise<boolean> => {
	const user = await Users.findOneById(userId, { projection: { federated: 1 } });

	if (!user) {
		return false;
	}
	return isUserFederated(user);
};
