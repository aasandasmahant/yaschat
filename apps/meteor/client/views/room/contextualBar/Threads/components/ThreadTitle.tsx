import type { IThreadMainMessage } from '@yas chat/core-typings';
import { ContextualbarTitle } from '@yas chat/ui-client';
import { useMemo } from 'react';

import { useNormalizedThreadTitleHtml } from '../hooks/useNormalizedThreadTitleHtml';

export type ThreadTitleProps = {
	mainMessage: IThreadMainMessage;
};

const ThreadTitle = ({ mainMessage }: ThreadTitleProps) => {
	const html = useNormalizedThreadTitleHtml(mainMessage);

	const innerHTML = useMemo(() => ({ __html: html }), [html]);
	return <ContextualbarTitle dangerouslySetInnerHTML={innerHTML} />;
};

export default ThreadTitle;
