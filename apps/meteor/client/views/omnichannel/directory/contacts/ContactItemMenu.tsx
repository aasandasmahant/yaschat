import type { ILivechatContactChannel } from '@yas chat/core-typings';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import type { GenericMenuItemProps } from '@yas chat/ui-client';
import { GenericMenu } from '@yas chat/ui-client';
import { useSetModal, usePermission } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import RemoveContactModal from './RemoveContactModal';
import { useOmnichannelDirectoryRouter } from '../hooks/useOmnichannelDirectoryRouter';

export type ContactItemMenuProps = {
	_id: string;
	name: string;
	channels: ILivechatContactChannel[];
};

const ContactItemMenu = ({ _id, name, channels }: ContactItemMenuProps) => {
	const { t } = useTranslation();
	const setModal = useSetModal();
	const omnichannelDirectoryRouter = useOmnichannelDirectoryRouter();

	const canEditContact = usePermission('update-livechat-contact');
	const canDeleteContact = usePermission('delete-livechat-contact');

	const handleContactEdit = useStableCallback((): void =>
		omnichannelDirectoryRouter.navigate({
			tab: 'contacts',
			context: 'edit',
			id: _id,
		}),
	);

	const handleContactRemoval = useStableCallback(() => {
		setModal(<RemoveContactModal _id={_id} name={name} channelsCount={channels.length} onClose={() => setModal(null)} />);
	});

	const menuOptions: GenericMenuItemProps[] = [
		{
			id: 'edit',
			icon: 'edit',
			content: t('Edit'),
			onClick: () => handleContactEdit(),
			disabled: !canEditContact,
		},
		{
			id: 'delete',
			icon: 'trash',
			content: t('Delete'),
			onClick: () => handleContactRemoval(),
			variant: 'danger',
			disabled: !canDeleteContact,
		},
	];

	return <GenericMenu detached title={t('More_actions')} sections={[{ title: '', items: menuOptions }]} placement='bottom-end' />;
};

export default ContactItemMenu;
