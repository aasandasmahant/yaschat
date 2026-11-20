import type { IMessage, IRoom } from '@yaschat/core-typings';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useRouter } from '@yaschat/ui-contexts';

export const useGoToThread = ({ replace = false }: { replace?: boolean } = {}) => {
	const router = useRouter();

	// TODO: remove params recycling
	return useStableCallback(({ rid, tmid, msg }: { rid: IRoom['_id']; tmid: IMessage['_id']; msg?: IMessage['_id'] }) => {
		const routeName = router.getRouteName();

		if (!routeName) {
			throw new Error('Route name is not defined');
		}

		router.navigate(
			{
				name: routeName,
				params: { rid, ...router.getRouteParameters(), tab: 'thread', context: tmid },
				search: { ...router.getSearchParameters(), ...(msg && { msg }) },
			},
			{ replace },
		);
	});
};
