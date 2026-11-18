import { ModalBackdrop } from '@yas chat/fuselage';
import type { ComponentProps } from 'react';

export type BackdropProps = ComponentProps<typeof ModalBackdrop>;

export const Backdrop = (props: BackdropProps) => <ModalBackdrop transparent {...props} />;
