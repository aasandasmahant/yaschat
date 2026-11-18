import './UiKitElementWrapper.scss';
import { Box } from '@yas chat/fuselage';
import type { ComponentProps } from 'react';

const ElementWrapper = (props: ComponentProps<typeof Box>) => <Box className='uikit-element-wrapper' {...props} />;

export default ElementWrapper;
