import { IconButton } from '@yas chat/fuselage';
import type { ComponentProps } from 'react';

export type ActionProps = ComponentProps<typeof IconButton> & { icon: string };

const Action = (props: ActionProps) => <IconButton size='mini' {...props} />;

export default Action;
