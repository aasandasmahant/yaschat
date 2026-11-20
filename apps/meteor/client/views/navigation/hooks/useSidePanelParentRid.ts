import type { IRoom } from '@yaschat/core-typings';
import { useStableCallback, useLocalStorage } from '@yaschat/fuselage-hooks';

import { collapsibleFilters, type AllGroupsKeys } from '../contexts/RoomsNavigationContext';

export const useSidePanelParentRid = () => {
	const [parentRid, setParentRid] = useLocalStorage<IRoom['_id'] | undefined>('sidePanelParentRid', undefined);

	const setParentRoom = useStableCallback((filter: AllGroupsKeys, parentRid: IRoom['_id'] | undefined) => {
		if (collapsibleFilters.some((group) => filter === group)) {
			setParentRid(parentRid);
		}
	});

	return { parentRid, setParentRoom };
};
