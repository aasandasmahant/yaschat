import type { IRoom } from '@yaschat/core-typings';
import { isPrivateRoom, isPublicRoom, isTeamRoom } from '@yaschat/core-typings';
import { Box } from '@yaschat/fuselage';
import { useRouter } from '@yaschat/ui-contexts';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../components/MarkdownText';
import { useCanEditRoom } from '../contextualBar/Info/hooks/useCanEditRoom';

export type RoomTopicProps = {
	room: IRoom;
};

const RoomTopic = ({ room }: RoomTopicProps) => {
	const { t } = useTranslation();
	const canEdit = useCanEditRoom(room);
	const router = useRouter();

	const currentRoute = router.getLocationPathname();
	const href = isTeamRoom(room) ? `${currentRoute}/team-info` : `${currentRoute}/channel-settings`;

	const { topic } = room;
	const canEditTopic = canEdit && (isPublicRoom(room) || isPrivateRoom(room));

	if (!topic && !canEditTopic) {
		return null;
	}

	if (!topic && canEditTopic) {
		return (
			<Box is='a' href={href}>
				{t('Add_topic')}
			</Box>
		);
	}

	return <MarkdownText color='default' parseEmoji={true} variant='inlineWithoutBreaks' withTruncatedText content={topic} />;
};

export default RoomTopic;
