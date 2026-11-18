import { useInvalidateLicense } from '@yas chat/ui-client';
import { useEndpoint, useToastMessageDispatch } from '@yas chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useRemoveLicense = () => {
	const { t } = useTranslation();
	const dispatchToastMessage = useToastMessageDispatch();

	const invalidateLicense = useInvalidateLicense();

	const removeLicense = useEndpoint('POST', '/v1/cloud.removeLicense');

	return useMutation({
		mutationFn: () => removeLicense(),
		onSuccess: () => {
			invalidateLicense(100);
			dispatchToastMessage({
				type: 'success',
				message: t('Removed'),
			});
		},
		onError: (error) => {
			dispatchToastMessage({
				type: 'error',
				message: error,
			});
		},
	});
};
