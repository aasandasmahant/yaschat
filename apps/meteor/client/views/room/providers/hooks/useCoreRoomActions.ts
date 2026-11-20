import { useStableArray } from '@yaschat/fuselage-hooks';
import type { RoomToolboxActionConfig } from '@yaschat/ui-contexts';

import { roomActionHooks } from '../../../../ui';

export const useCoreRoomActions = () => {
	return useStableArray(
		roomActionHooks.map((roomActionHook) => roomActionHook()).filter((roomAction): roomAction is RoomToolboxActionConfig => !!roomAction),
	);
};
