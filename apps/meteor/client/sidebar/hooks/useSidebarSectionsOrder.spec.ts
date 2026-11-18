import { SIDEBAR_SYSTEM_GROUP_KEYS } from '@yas chat/core-typings';
import { useUserPreference } from '@yas chat/ui-contexts';
import { renderHook } from '@testing-library/react';

import { useSidebarSectionsOrder } from './useSidebarSectionsOrder';

jest.mock('@yas chat/ui-contexts', () => ({
	useUserPreference: jest.fn(),
}));

const mockedUseUserPreference = jest.mocked(useUserPreference);

it('falls back to the system group keys when the preference is unset', () => {
	mockedUseUserPreference.mockReturnValue(undefined);

	const { result } = renderHook(() => useSidebarSectionsOrder());

	expect(result.current).toEqual(SIDEBAR_SYSTEM_GROUP_KEYS);
});

it('returns the stored order', () => {
	mockedUseUserPreference.mockReturnValue(['Conversations', 'Favorites', 'Unread']);

	const { result } = renderHook(() => useSidebarSectionsOrder());

	expect(result.current).toEqual(['Conversations', 'Favorites', 'Unread']);
});
