import { SidebarAction } from '@yas chat/fuselage';
import { GenericMenu } from '@yas chat/ui-client';
import type { HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateNewMenu } from './hooks/useCreateNewMenu';

type CreateRoomProps = Omit<HTMLAttributes<HTMLElement>, 'is'>;

const NavBarItemCreateNew = (props: CreateRoomProps) => {
	const { t } = useTranslation();

	const sections = useCreateNewMenu();

	return <GenericMenu icon='plus' sections={sections} title={t('Create_new')} is={SidebarAction} {...props} />;
};

export default NavBarItemCreateNew;
