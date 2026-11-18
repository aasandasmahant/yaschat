import { Tag } from '@yas chat/fuselage';
import type { ReactNode } from 'react';

export type UserCardRoleProps = { children: ReactNode };

const UserCardRole = ({ children }: UserCardRoleProps) => <Tag medium>{children}</Tag>;

export default UserCardRole;
