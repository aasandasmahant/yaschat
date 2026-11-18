import type * as MessageParser from '@yas chat/message-parser';

import InlineElements from '../elements/InlineElements';

export type ParagraphBlockProps = {
	children: MessageParser.Inlines[];
};

const ParagraphBlock = ({ children }: ParagraphBlockProps) => (
	<div>
		<InlineElements>{children}</InlineElements>
	</div>
);

export default ParagraphBlock;
