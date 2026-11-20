import { css } from '@yaschat/css-in-js';
import { Box } from '@yaschat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

const wordBreak = css`
	word-break: break-word;
`;

export type AuditModalTextProps = ComponentPropsWithoutRef<typeof Box>;

const AuditModalText = (props: AuditModalTextProps) => <Box fontScale='p2' color='default' className={wordBreak} {...props} />;

export default AuditModalText;
