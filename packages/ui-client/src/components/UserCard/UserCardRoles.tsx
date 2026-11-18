import { Box } from '@yas chat/fuselage';
import type { ReactNode } from 'react';

export type UserCardRolesProps = { children: ReactNode };

const UserCardRoles = ({ children }: UserCardRolesProps) => (
	<Box display='flex' flexWrap='wrap' gap='x4'>
		{children}
	</Box>
);

export default UserCardRoles;
