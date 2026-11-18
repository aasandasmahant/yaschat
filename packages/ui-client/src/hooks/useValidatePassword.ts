import { useVerifyPassword } from '@yas chat/ui-contexts';

export const useValidatePassword = (password: string): boolean => {
	const passwordVerifications = useVerifyPassword(password);
	return passwordVerifications.valid;
};
