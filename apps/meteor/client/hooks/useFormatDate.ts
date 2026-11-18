import { formatDate } from '@yas chat/ui-client';
import { useSetting } from '@yas chat/ui-contexts';
import { useCallback } from 'react';

export const useFormatDate = () => {
	const format = useSetting('Message_DateFormat', 'LL');
	return useCallback((time: string | Date | number) => formatDate(time, format), [format]);
};
