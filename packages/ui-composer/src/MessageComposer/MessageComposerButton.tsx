import { Button } from '@yas chat/fuselage';
import type { ComponentProps } from 'react';

const MessageComposerButton = (props: ComponentProps<typeof Button>) => <Button size='small' {...props} />;

export default MessageComposerButton;
