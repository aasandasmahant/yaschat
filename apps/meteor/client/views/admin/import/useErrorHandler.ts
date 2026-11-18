import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useToastMessageDispatch } from '@yas chat/ui-contexts';

export const useErrorHandler = () => {
	const dispatchToastMessage = useToastMessageDispatch();

	return useStableCallback((error: unknown, defaultMessage?: unknown) => {
		console.error(error);

		dispatchToastMessage({ type: 'error', message: error ?? defaultMessage });
	});
};
