import type { IRoom } from '@yas chat/core-typings';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useEndpoint, useRouter } from '@yas chat/ui-contexts';

export const useGoToRoom = (): ((roomId: IRoom['_id']) => Promise<void>) => {
	const router = useRouter();
	const getRoomInfo = useEndpoint('GET', '/v1/rooms.info');

	return useStableCallback(async (roomId: IRoom['_id']) => {
		const { room } = await getRoomInfo({ roomId });

		if (!room) return;

		const { t, name, _id: rid } = room;

		const { path } = router.getRoomRoute(t, ['c', 'p'].includes(t) ? { name } : { rid });

		router.navigate({ pathname: path });
	});
};
