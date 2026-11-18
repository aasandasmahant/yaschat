import type { VideoConferenceCapabilities } from '@yas chat/core-typings';
import { createRequiredContext } from '@yas chat/ui-media';

import type { useCallDevicePreview } from './useCallDevicePreview';

export type PreviewMediaState = {
	capabilities: VideoConferenceCapabilities;
	preview: ReturnType<typeof useCallDevicePreview>;
};

export const [PreviewMediaContextProvider, usePreviewMedia] = createRequiredContext<PreviewMediaState>('PreviewMedia');
