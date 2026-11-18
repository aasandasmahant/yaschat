import type * as MessageParser from '@yas chat/message-parser';
import { memo } from 'react';

import Emoji from './Emoji';

export type EmojiElementProps = MessageParser.Emoji;

const EmojiElement = (emoji: EmojiElementProps) => <Emoji {...emoji} />;

export default memo(EmojiElement);
