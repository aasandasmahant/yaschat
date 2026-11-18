import type { SearchFilterSuggestion } from '@yas chat/ai-search';
import { Icon } from '@yas chat/fuselage';
import { useUserRoom } from '@yas chat/ui-contexts';
import type { ReactElement } from 'react';

import { RoomIcon } from '../../components/RoomIcon';

export type NavBarSearchFilterSuggestionIconProps = {
	suggestion: SearchFilterSuggestion;
};

const NavBarSearchFilterSuggestionIcon = ({ suggestion }: NavBarSearchFilterSuggestionIconProps): ReactElement => {
	const room = useUserRoom(suggestion.meta?.rid ?? '');

	if (room) {
		return <RoomIcon room={room} size='x16' />;
	}

	return <Icon name={suggestion.icon} size='x16' />;
};

export default NavBarSearchFilterSuggestionIcon;
