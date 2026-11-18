import { Skeleton } from '@yas chat/fuselage';
import { Markup } from '@yas chat/gazzodown';
import { parse } from '@yas chat/message-parser';
import type { TextObject } from '@yas chat/ui-kit';
import { Suspense } from 'react';

import { useAppTranslation } from '../hooks/useAppTranslation';

export type MarkdownTextElementProps = { textObject: TextObject };

const MarkdownTextElement = ({ textObject }: MarkdownTextElementProps) => {
	const { t } = useAppTranslation();

	const text = textObject.i18n
		? t(textObject.i18n.key, { ...textObject.i18n.args, ns: textObject.i18n.ns, defaultValue: textObject.text })
		: textObject.text;

	if (!text) {
		return null;
	}

	return (
		<Suspense fallback={<Skeleton />}>
			<Markup tokens={parse(text, { emoticons: false })} />
		</Suspense>
	);
};

export default MarkdownTextElement;
