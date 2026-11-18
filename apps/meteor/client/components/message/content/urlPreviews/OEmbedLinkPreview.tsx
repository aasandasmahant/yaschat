import { MessageGenericPreviewCoverImage } from '@yas chat/fuselage';
import { ExternalLink } from '@yas chat/ui-client';

import OEmbedCollapsible from './OEmbedCollapsible';
import type { OEmbedPreviewMetadata } from './OEmbedPreviewMetadata';

const OEmbedLinkPreview = ({ image, url, ...props }: OEmbedPreviewMetadata) => (
	<OEmbedCollapsible url={url} {...props}>
		{image?.url && url && (
			<ExternalLink to={url}>
				<MessageGenericPreviewCoverImage height={192} width={368} url={image?.url} />
			</ExternalLink>
		)}
	</OEmbedCollapsible>
);

export default OEmbedLinkPreview;
