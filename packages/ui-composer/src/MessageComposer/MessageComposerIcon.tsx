import { Icon } from '@yas chat/fuselage';
import type { Keys } from '@yas chat/icons';
import type { HTMLAttributes } from 'react';

export type MessageComposerIconProps = { name: Keys } & Omit<HTMLAttributes<HTMLElement>, 'is' | 'color'>;

const MessageComposerIcon = ({ name, ...props }: MessageComposerIconProps) => <Icon name={name} size='x20' {...props} />;

export default MessageComposerIcon;
