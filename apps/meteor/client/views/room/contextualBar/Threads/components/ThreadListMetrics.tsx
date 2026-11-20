import { MessageMetricsItem, MessageBlock, MessageMetrics, MessageMetricsItemIcon, MessageMetricsItemLabel } from '@yaschat/fuselage';
import { useResizeObserver } from '@yaschat/fuselage-hooks';
import { useTimeAgo } from '@yaschat/ui-client';
import { useTranslation } from 'react-i18next';

import ThreadMetricsParticipants from '../../../../../components/message/content/ThreadMetricsParticipants';

type ThreadMetricsProps = {
	lm: Date;
	counter: number;
	participants: Array<string>;
};

const ThreadListMetrics = ({ counter, participants, lm }: ThreadMetricsProps) => {
	const { t } = useTranslation();

	const format = useTimeAgo();

	const { ref, borderBoxSize } = useResizeObserver<HTMLDivElement>();

	const isSmall = (borderBoxSize.inlineSize || Infinity) < 200;

	return (
		<MessageBlock ref={ref}>
			<MessageMetrics>
				{participants?.length > 0 && <ThreadMetricsParticipants participants={participants} />}
				<MessageMetricsItem title={t('Last_message__date__', { date: format(lm) })}>
					<MessageMetricsItemIcon name='thread' />
					{isSmall ? (
						<MessageMetricsItemLabel>{t('__count__replies', { count: counter })}</MessageMetricsItemLabel>
					) : (
						<MessageMetricsItemLabel>{t('__count__replies__date__', { count: counter, date: format(lm) })}</MessageMetricsItemLabel>
					)}
				</MessageMetricsItem>
			</MessageMetrics>
		</MessageBlock>
	);
};

export default ThreadListMetrics;
