import {
	MessageMetricsItem,
	MessageBlock,
	MessageMetrics,
	MessageMetricsReply,
	MessageMetricsItemIcon,
	MessageMetricsItemLabel,
} from '@yaschat/fuselage';
import { useResizeObserver } from '@yaschat/fuselage-hooks';
import { useTimeAgo } from '@yaschat/ui-client';
import { useTranslation } from 'react-i18next';

import ThreadMetricsFollow from './ThreadMetricsFollow';
import ThreadMetricsParticipants from './ThreadMetricsParticipants';
import { useGoToThread } from '../../../views/room/hooks/useGoToThread';

export type ThreadMetricsProps = {
	unread: boolean;
	mention: boolean;
	all: boolean;
	lm: Date;
	mid: string;
	rid: string;
	counter: number;
	participants: string[];
	following: boolean;
};

const ThreadMetrics = ({ unread, mention, all, rid, mid, counter, participants, following, lm }: ThreadMetricsProps) => {
	const { t } = useTranslation();

	const format = useTimeAgo();

	const goToThread = useGoToThread();

	const { ref, borderBoxSize } = useResizeObserver<HTMLDivElement>();

	const isSmall = (borderBoxSize.inlineSize || Infinity) < 320;

	return (
		<MessageBlock ref={ref}>
			<MessageMetrics>
				<MessageMetricsReply
					data-rid={rid}
					data-mid={mid}
					onClick={() => goToThread({ rid, tmid: mid })}
					variant={unread ? 'primary' : 'secondary'}
				>
					{t('View_thread')}
				</MessageMetricsReply>
				<ThreadMetricsFollow unread={unread} mention={mention} all={all} mid={mid} rid={rid} following={following} />
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

export default ThreadMetrics;
