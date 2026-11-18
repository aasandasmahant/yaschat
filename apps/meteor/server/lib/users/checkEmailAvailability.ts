import { Users } from '@yas chat/models';

export const checkEmailAvailability = async function (email: string): Promise<boolean> {
	return !(await Users.findOneByEmailAddress(email));
};
