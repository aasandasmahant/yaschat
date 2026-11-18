import { useEndpoint, useToastMessageDispatch } from '@yas chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';

export const useDismissUserBannerMutation = () => {
	const dismissBanner = useEndpoint('POST', '/v1/banners.dismiss');

	const dispatchToastMessage = useToastMessageDispatch();

	return useMutation({
		mutationFn: ({ id }: { id: string }) => dismissBanner({ bannerId: id }),
		onError: (error) => {
			dispatchToastMessage({ type: 'error', message: error });
		},
	});
};
