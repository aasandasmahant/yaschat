import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useToastMessageDispatch } from '@yaschat/ui-contexts';

export const useErrorHandler = () => {
	const dispatchToastMessage = useToastMessageDispatch();

	return useStableCallback((error: unknown, defaultMessage?: unknown) => {
		console.error(error);

		dispatchToastMessage({ type: 'error', message: error ?? defaultMessage });
	});
};
