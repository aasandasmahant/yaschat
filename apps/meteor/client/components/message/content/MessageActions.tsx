import type { IMessage } from '@yas chat/core-typings';
import { Box, ButtonGroup } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import type { Keys as IconName } from '@yas chat/icons';
import type { TranslationKey } from '@yas chat/ui-contexts';

import MessageAction from './actions/MessageAction';
import { actionLinks } from '../../../lib/actionLinks';

type MessageActionOptions = {
	icon: IconName;
	i18nLabel?: TranslationKey;
	label?: string;
	methodId: string;
	runAction?: (action: string) => () => void;
	actionLinksAlignment?: string;
};

export type MessageActionsProps = {
	message: IMessage;
	actions: MessageActionOptions[];
};

const MessageActions = ({ message, actions }: MessageActionsProps) => {
	const runAction = useStableCallback((action: string) => () => {
		actionLinks.run(action, message);
	});

	const alignment = actions[0]?.actionLinksAlignment || 'center';

	return (
		<Box display='flex' marginBlock={4} marginInline={-4} paddingInline={4} width='full' justifyContent={alignment}>
			<ButtonGroup align='center' large>
				{actions.map((action, key) => (
					<MessageAction key={key} runAction={runAction} {...action} />
				))}
			</ButtonGroup>
		</Box>
	);
};

export default MessageActions;
