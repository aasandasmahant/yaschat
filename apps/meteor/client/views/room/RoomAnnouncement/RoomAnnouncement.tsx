import { Box } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { AnnouncementBanner, GenericModal } from '@yaschat/ui-client';
import { useSetModal } from '@yaschat/ui-contexts';
import type { KeyboardEvent, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../components/MarkdownText';

type RoomAnnouncementParams = {
	announcement: string;
};

const RoomAnnouncement = ({ announcement }: RoomAnnouncementParams) => {
	const { t } = useTranslation();
	const setModal = useSetModal();

	const handleOpenAnnouncement = useStableCallback(() => {
		setModal(
			<GenericModal
				icon={null}
				title={t('Announcement')}
				confirmText={t('Close')}
				onConfirm={() => setModal(null)}
				onClose={() => setModal(null)}
			>
				<Box>
					<MarkdownText content={announcement} parseEmoji />
				</Box>
			</GenericModal>,
		);
	});

	const handleClick = (e: MouseEvent) => {
		if ((e.target as HTMLAnchorElement).href) {
			return;
		}

		if (window?.getSelection()?.toString() !== '') {
			return;
		}

		handleOpenAnnouncement();
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if ((e.target as HTMLAnchorElement).href) {
			return;
		}

		if (e.code === 'Enter' || e.code === 'Space') {
			e.preventDefault();
			handleOpenAnnouncement();
		}
	};

	return announcement ? (
		<AnnouncementBanner onClick={handleClick} onKeyDown={handleKeyDown}>
			<MarkdownText variant='inlineWithoutBreaks' content={announcement} withTruncatedText parseEmoji />
		</AnnouncementBanner>
	) : null;
};

export default RoomAnnouncement;
