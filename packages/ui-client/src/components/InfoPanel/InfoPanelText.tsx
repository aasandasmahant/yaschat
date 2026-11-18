import { css } from '@yas chat/css-in-js';
import { Box } from '@yas chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

const wordBreak = css`
	word-break: break-word;
`;

export type InfoPanelTextProps = ComponentPropsWithoutRef<typeof Box>;

const InfoPanelText = (props: InfoPanelTextProps) => <Box marginBlock={8} fontScale='p2' color='hint' className={wordBreak} {...props} />;

export default InfoPanelText;
