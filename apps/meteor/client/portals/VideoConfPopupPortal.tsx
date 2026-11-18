import { AnchorPortal } from '@yas chat/ui-client';
import type { ReactNode } from 'react';
import { memo } from 'react';

const videoConfAnchorId = 'video-conf-root';

export type VideoConfPortalProps = {
	children?: ReactNode;
};

const VideoConfPortal = ({ children }: VideoConfPortalProps) => {
	return <AnchorPortal id={videoConfAnchorId}>{children}</AnchorPortal>;
};

export default memo(VideoConfPortal);
