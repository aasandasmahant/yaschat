import { css } from '@yaschat/css-in-js';
import { Box, Badge } from '@yaschat/fuselage';
import type { ReactNode } from 'react';

export type SidebarTogglerBadgeProps = {
	children?: ReactNode;
};

const SidebarTogglerBadge = ({ children }: SidebarTogglerBadgeProps) => (
	<Box
		className={css`
			position: absolute;
			z-index: 3;
			top: -5px;
			right: -5px;
		`}
	>
		<Badge variant='danger'>{children}</Badge>
	</Box>
);

export default SidebarTogglerBadge;
