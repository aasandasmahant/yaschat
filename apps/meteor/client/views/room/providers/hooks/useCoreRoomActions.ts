import { useStableArray } from '@yas chat/fuselage-hooks';
import type { RoomToolboxActionConfig } from '@yas chat/ui-contexts';

import { roomActionHooks } from '../../../../ui';

export const useCoreRoomActions = () => {
	return useStableArray(
		roomActionHooks.map((roomActionHook) => roomActionHook()).filter((roomAction): roomAction is RoomToolboxActionConfig => !!roomAction),
	);
};
