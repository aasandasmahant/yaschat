import { css } from '@yaschat/css-in-js';
import { Box } from '@yaschat/fuselage';
import { useAttachmentDimensions } from '@yaschat/ui-contexts';
import type { ComponentPropsWithoutRef } from 'react';

const className = css`
	white-space: normal;
`;

export type AttachmentProps = ComponentPropsWithoutRef<typeof Box>;

const Attachment = (props: AttachmentProps) => {
	const { width } = useAttachmentDimensions();
	return (
		<Box
			rcx-message-attachment
			marginBlock={4}
			maxWidth={width}
			width='full'
			display='flex'
			overflow='hidden'
			flexDirection='column'
			className={className}
			{...props}
		/>
	);
};

export default Attachment;
