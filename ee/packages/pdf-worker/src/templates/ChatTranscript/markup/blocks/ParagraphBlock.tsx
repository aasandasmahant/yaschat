import type * as MessageParser from '@yas chat/message-parser';

import InlineElements from '../elements/InlineElements';

export type ParagraphBlockProps = {
	items: MessageParser.Inlines[];
};

const ParagraphBlock = ({ items }: ParagraphBlockProps) => <InlineElements>{items}</InlineElements>;

export default ParagraphBlock;
