import { Box } from '@yaschat/fuselage';
import type { ComponentProps } from 'react';

export type LabelProps = ComponentProps<typeof Box>;

const Label = (props: LabelProps) => <Box marginBlockEnd={8} fontScale='p2m' color='default' {...props} />;
export default Label;
