import { css } from '@yas chat/css-in-js';
import { Box } from '@yas chat/fuselage';
import type * as MessageParser from '@yas chat/message-parser';

import Markup from '../Markup';

// The message body strips list indentation, so nested lists win it back here.
const nestedListsStyle = css`
	padding-inline-start: 1.25rem;

	&& > ul,
	&& > ol {
		padding-block: 0;
	}
`;

type NestedListsBlockProps = {
	lists: MessageParser.NestedList[];
};

const NestedListsBlock = ({ lists }: NestedListsBlockProps) => (
	<Box className={nestedListsStyle}>
		<Markup tokens={lists} />
	</Box>
);

export default NestedListsBlock;
