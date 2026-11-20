import { Box } from '@yaschat/fuselage';
import type { ComponentProps } from 'react';

export type CollapsiblePanelProps = ComponentProps<typeof Box>;

export const CollapsiblePanel = (props: CollapsiblePanelProps) => {
	return (
		<Box {...props} is='dl'>
			{props.children}
		</Box>
	);
};
