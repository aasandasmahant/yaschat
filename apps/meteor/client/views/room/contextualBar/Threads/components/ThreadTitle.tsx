import type { IThreadMainMessage } from '@yaschat/core-typings';
import { ContextualbarTitle } from '@yaschat/ui-client';
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
