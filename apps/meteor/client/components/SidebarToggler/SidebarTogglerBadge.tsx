import { css } from '@yas chat/css-in-js';
import { Box, Badge } from '@yas chat/fuselage';
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
