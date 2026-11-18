import { ContextualbarTitle as FuselageContextualbarTitle } from '@yas chat/fuselage';
import type { ComponentProps } from 'react';

const ContextualbarTitle = (props: ComponentProps<typeof FuselageContextualbarTitle>) => (
	<FuselageContextualbarTitle id='contextualbarTitle' {...props} />
);

export default ContextualbarTitle;
