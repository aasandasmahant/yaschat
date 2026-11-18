import type { AvatarProps } from '@yas chat/fuselage';
import { Avatar, Skeleton } from '@yas chat/fuselage';
import { useStableCallback, usePrevious } from '@yas chat/fuselage-hooks';
import type { SyntheticEvent } from 'react';
import { useState } from 'react';

export type BaseAvatarProps = Omit<AvatarProps, 'is'>;

const BaseAvatar = ({ url, onLoad, onError, size, ...props }: BaseAvatarProps) => {
	const [unloaded, setUnloaded] = useState(false);
	const prevUrl = usePrevious(url);

	const handleLoad = useStableCallback((event: SyntheticEvent<HTMLImageElement, Event>) => {
		setUnloaded(false);
		onLoad?.(event);
	});

	const handleError = useStableCallback((event: SyntheticEvent<HTMLImageElement, ErrorEvent>) => {
		setUnloaded(true);
		onError?.(event);
	});

	if (unloaded && url === prevUrl) {
		return <Skeleton aria-hidden='true' variant='rect' width={size} height={size} {...props} />;
	}

	return <Avatar aria-hidden='true' onLoad={handleLoad} onError={handleError} url={url} size={size} {...props} />;
};

export default BaseAvatar;
