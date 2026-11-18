import { Box, Avatar } from '@yas chat/fuselage';
import { memo } from 'react';

export type AttachmentThumbProps = { url: string };

const AttachmentThumb = ({ url }: AttachmentThumbProps) => (
	<Box marginInlineStart={8}>
		<Avatar {...({ url, size: 'x48' } as any)} />
	</Box>
);

export default memo(AttachmentThumb);
