import { useUTCClock } from '@yas chat/ui-client';
import { memo } from 'react';

export type LocalTimeProps = {
	utcOffset: number;
};

const LocalTime = ({ utcOffset }: LocalTimeProps) => {
	const time = useUTCClock(utcOffset);

	return <>{time}</>;
};

export default memo(LocalTime);
