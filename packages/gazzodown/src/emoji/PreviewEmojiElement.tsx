import type * as MessageParser from '@yas chat/message-parser';

import Emoji from './Emoji';

export type PreviewEmojiElementProps = MessageParser.Emoji;

const PreviewEmojiElement = (emoji: PreviewEmojiElementProps) => <Emoji preview {...emoji} />;

export default PreviewEmojiElement;
