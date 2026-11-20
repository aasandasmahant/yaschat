import { css } from '@yaschat/css-in-js';
import { Box } from '@yaschat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

const hoverUnderlineStyle = css`
	&:hover,
	&:focus-visible {
		text-decoration: underline;
	}
`;

type AttachmentAuthorTimestampProps = ComponentPropsWithoutRef<typeof Box>;

const AttachmentAuthorTimestamp = ({ href, ...props }: AttachmentAuthorTimestampProps) =>
	href ? (
		<Box is='a' href={href} className={hoverUnderlineStyle} color='default' fontScale='c1' {...props} />
	) : (
		<Box fontScale='c1' {...props} />
	);

export default AttachmentAuthorTimestamp;
