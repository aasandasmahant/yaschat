import { IconButton } from '@yas chat/fuselage';
import type { ComponentProps } from 'react';

const VideoConfMessageAction = ({ icon = 'info', ...props }: ComponentProps<typeof IconButton>) => (
	<IconButton {...props} icon={icon} size='small' />
);
export default VideoConfMessageAction;
