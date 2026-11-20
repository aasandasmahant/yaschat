import type { ILivechatContact } from '@yaschat/core-typings';
import { IconButton } from '@yaschat/fuselage';
import { useClipboardWithToast } from '@yaschat/ui-client';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import ContactInfoDetailsEntry from './ContactInfoDetailsEntry';
import ContactInfoOutboundMessageButton from './ContactInfoOutboundMessageButton';
import { parseOutboundPhoneNumber } from '../../../../../lib/voip/parseOutboundPhoneNumber';

export type ContactInfoPhoneEntryProps = Omit<ComponentProps<typeof ContactInfoDetailsEntry>, 'icon' | 'actions'> & {
	contact?: Pick<ILivechatContact, '_id' | 'unknown'>;
};

const ContactInfoPhoneEntry = ({ contact, value, ...props }: ContactInfoPhoneEntryProps) => {
	const { t } = useTranslation();
	const { copy } = useClipboardWithToast(value);

	return (
		<ContactInfoDetailsEntry
			{...props}
			icon='phone'
			value={parseOutboundPhoneNumber(value)}
			actions={[
				<IconButton key={`${value}-copy`} onClick={() => copy()} size='tiny' icon='copy' title={t('Copy')} />,
				null,
				<ContactInfoOutboundMessageButton
					key={`${value}-outbound-message`}
					title={contact?.unknown ? t('error-unknown-contact') : undefined}
					disabled={contact?.unknown}
					defaultValues={{ contactId: contact?._id, recipient: value }}
				/>,
			]}
		/>
	);
};

export default ContactInfoPhoneEntry;
