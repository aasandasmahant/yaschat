import { useEndpoint } from '@yas chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

export const useLoginSendEmailConfirmation = () => {
	return useMutation({
		mutationFn: useEndpoint('POST', '/v1/users.sendConfirmationEmail'),
	});
};
