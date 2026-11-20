import { css } from '@yaschat/css-in-js';
import { Box } from '@yaschat/fuselage';
import type { ComponentProps, ReactNode } from 'react';

export type CollapsibleRegionProps = {
	children: ReactNode;
	expanded?: boolean;
} & ComponentProps<typeof Box>;

export const CollapsibleRegion = ({ children, expanded, ...props }: CollapsibleRegionProps) => {
	return (
		<Box
			{...props}
			maxHeight={expanded ? 'fit-content' : 0}
			className={[
				css`
					transition: all 0.18s ease;
				`,
			]}
			overflowY='hidden'
			is='dd'
		>
			<Box role='region'>{children}</Box>
		</Box>
	);
};
