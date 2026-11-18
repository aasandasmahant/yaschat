import type * as MessageParser from '@yas chat/message-parser';
import { useMemo } from 'react';

export type PreviewCodeBlockProps = {
	language?: string;
	lines: MessageParser.CodeLine[];
};

export const PreviewCodeBlock = ({ lines }: PreviewCodeBlockProps) => {
	const firstLine = useMemo(() => lines.find((line) => line.value.value.trim())?.value.value.trim(), [lines]);

	if (!firstLine) {
		return null;
	}

	return <>{firstLine}</>;
};

export default PreviewCodeBlock;
