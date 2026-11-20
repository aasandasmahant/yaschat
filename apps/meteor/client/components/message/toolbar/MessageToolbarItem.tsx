import { MessageToolbarItem as FuselageMessageToolbarItem } from '@yaschat/fuselage';
import type { Keys as IconName } from '@yaschat/icons';
import { useLayoutHiddenActions } from '@yaschat/ui-contexts';
import type { MouseEventHandler } from 'react';

export type MessageToolbarItemProps = {
	id: string;
	icon: IconName;
	title: string;
	disabled?: boolean;
	onClick: MouseEventHandler;
};

const MessageToolbarItem = ({ id, icon, title, disabled, onClick }: MessageToolbarItemProps) => {
	const hiddenActions = useLayoutHiddenActions().messageToolbox;

	if (hiddenActions.includes(id)) {
		return null;
	}

	return <FuselageMessageToolbarItem icon={icon} title={title} disabled={disabled} onClick={onClick} />;
};

export default MessageToolbarItem;
