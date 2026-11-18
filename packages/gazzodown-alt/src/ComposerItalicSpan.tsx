import type * as MessageParser from '@yas chat/message-parser';
import type { ReactElement } from 'react';

import ComposerInlineElements from './ComposerInlineElements.js';

type ComposerItalicSpanProps = {
	children: MessageParser.Italic['value'];
};

const ComposerItalicSpan = ({ children }: ComposerItalicSpanProps): ReactElement => (
	<>
		_
		<em>
			<ComposerInlineElements>{children}</ComposerInlineElements>
		</em>
		_
	</>
);

export default ComposerItalicSpan;
