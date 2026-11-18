import type { IRoom } from '@yas chat/core-typings';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useEndpoint, useToastMessageDispatch } from '@yas chat/ui-contexts';

export const useToggleFavoriteAction = ({ rid, isFavorite }: { rid: IRoom['_id']; isFavorite: boolean }) => {
	const toggleFavorite = useEndpoint('POST', '/v1/rooms.favorite');
	const dispatchToastMessage = useToastMessageDispatch();

	const handleToggleFavorite = useStableCallback(async () => {
		try {
			await toggleFavorite({ roomId: rid, favorite: !isFavorite });
		} catch (error) {
			dispatchToastMessage({ type: 'error', message: error });
		}
	});

	return handleToggleFavorite;
};
