import { FieldLabel as FieldLabelComponent } from '@yas chat/fuselage';
import { useMergedRefs } from '@yas chat/fuselage-hooks';
import type { ComponentProps } from 'react';

import { useFieldLabel } from '../FieldContext';

export type LabelForProps = ComponentProps<typeof FieldLabelComponent>;

const LabelFor = ({ children, ref, ...props }: LabelForProps) => {
	const [labelRef, id] = useFieldLabel();
	const mergedRef = useMergedRefs(ref, labelRef);
	return (
		<FieldLabelComponent {...props} ref={mergedRef} id={id} is='span'>
			{children}
		</FieldLabelComponent>
	);
};

export default LabelFor;
