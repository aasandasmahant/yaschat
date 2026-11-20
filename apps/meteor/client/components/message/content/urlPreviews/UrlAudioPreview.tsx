import { AudioPlayer } from '@yaschat/fuselage';

import type { UrlPreviewMetadata } from './UrlPreviewMetadata';

export type UrlAudioPreviewProps = Pick<UrlPreviewMetadata, 'url'>;

const UrlAudioPreview = ({ url }: UrlAudioPreviewProps) => <AudioPlayer src={url} />;

export default UrlAudioPreview;
