import type { PreviewVideoProviderProps } from '@yas chat/ui-conference';
import { PreviewVideoContext } from '@yas chat/ui-conference';
import { useMediaDevices } from '@yas chat/ui-media';

import { usePreviewVideoTrack } from './usePreviewVideoTrack';

/**
 * The preflight's camera, opened with LiveKit and handed to `children` through `usePreviewVideo`. A component, so
 * an application can load it lazily and keep the LiveKit SDK out of its bundle.
 */
export const PreviewVideoProvider = ({ enabled, deviceId, quality, children }: PreviewVideoProviderProps) => {
	// Camera permission is what names the cameras on the device lists.
	const { refresh } = useMediaDevices();
	const preview = usePreviewVideoTrack(enabled, { deviceId, quality, onOpen: refresh });

	return <PreviewVideoContext.Provider value={preview}>{children}</PreviewVideoContext.Provider>;
};
