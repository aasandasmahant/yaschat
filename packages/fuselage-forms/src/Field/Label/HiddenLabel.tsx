import { FieldLabel as FieldLabelComponent } from '@yas chat/fuselage';
import { useMergedRefs } from '@yas chat/fuselage-hooks';
import type { ComponentProps } from 'react';

import { useFieldLabel } from '../FieldContext';

export type HiddenLabelProps = ComponentProps<typeof FieldLabelComponent>;

const HiddenLabel = ({ children, ref, ...props }: HiddenLabelProps) => {
	const [labelRef] = useFieldLabel();
	const mergedRef = useMergedRefs(ref, labelRef);

	return (
		<FieldLabelComponent {...props} ref={mergedRef} is='span'>
			{children}
		</FieldLabelComponent>
	);
};

export default HiddenLabel;
