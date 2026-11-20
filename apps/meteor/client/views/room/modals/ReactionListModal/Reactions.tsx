import type { IMessage } from '@yaschat/core-typings';
import { Box } from '@yaschat/fuselage';
import { useSetting } from '@yaschat/ui-contexts';

import ReactionUserTag from './ReactionUserTag';
import Emoji from '../../../../components/Emoji';

export type ReactionsProps = { reactions: Required<IMessage>['reactions'] };

const Reactions = ({ reactions }: ReactionsProps) => {
	const useRealName = useSetting('UI_Use_Real_Name');

	return (
		<Box display='flex' flexDirection='column'>
			{Object.entries(reactions).map(([reaction, { names = [], usernames }]) => (
				<Box key={reaction} display='flex' alignItems='center' flexDirection='row' overflowX='hidden' marginBlock={8}>
					<Emoji emojiHandle={reaction} />
					<Box display='flex' flexWrap='wrap' paddingBlock={4} marginInlineStart={4}>
						{usernames.map((username, i: number) => (
							<ReactionUserTag key={username} displayName={useRealName ? names[i] || username : username} />
						))}
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default Reactions;
