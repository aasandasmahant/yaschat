import { View } from '@react-pdf/renderer';
import typography from '@yas chat/fuselage-tokens/dist/typography.json';
import type * as MessageParser from '@yas chat/message-parser';

import InlineElements from '../elements/InlineElements';

const { fontScale } = typography;

type HeadingBlockProps = {
	items?: MessageParser.Inlines[];
	level?: 1 | 2 | 3 | 4;
};

const Header = ({ items = [], level = 1 }: HeadingBlockProps) => (
	<View style={{ fontSize: fontScale[`h${level}`].fontSize, fontWeight: fontScale[`h${level}`].fontWeight }}>
		<InlineElements>{items}</InlineElements>
	</View>
);

export default Header;
