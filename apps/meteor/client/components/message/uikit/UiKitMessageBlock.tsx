import type { IMessage, IRoom } from '@yaschat/core-typings';
import { MessageBlock } from '@yaschat/fuselage';
import { UiKitComponent, UiKitMessage as UiKitMessageSurfaceRender, UiKitContext } from '@yaschat/fuselage-ui-kit';
import type { MessageSurfaceLayout } from '@yaschat/ui-kit';

import { useMessageBlockContextValue } from './useMessageBlockContextValue';
import GazzodownText from '../../GazzodownText';

export type UiKitMessageBlockProps = {
	rid: IRoom['_id'];
	mid: IMessage['_id'];
	blocks: MessageSurfaceLayout;
};

const UiKitMessageBlock = ({ rid, mid, blocks }: UiKitMessageBlockProps) => {
	const contextValue = useMessageBlockContextValue(rid, mid);

	return (
		<MessageBlock fixedWidth>
			<UiKitContext.Provider value={contextValue}>
				<GazzodownText>
					<UiKitComponent render={UiKitMessageSurfaceRender} blocks={blocks} />
				</GazzodownText>
			</UiKitContext.Provider>
		</MessageBlock>
	);
};

export default UiKitMessageBlock;
