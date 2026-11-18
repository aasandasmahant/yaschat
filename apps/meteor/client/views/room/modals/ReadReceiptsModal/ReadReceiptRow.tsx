import type { IReadReceiptWithUser } from '@yas chat/core-typings';
import { Box, Text } from '@yas chat/fuselage';
import { UserAvatar } from '@yas chat/ui-avatar';
import { useUserDisplayName, useFormatDateAndTime } from '@yas chat/ui-client';

const ReadReceiptRow = ({ user, ts }: IReadReceiptWithUser) => {
	const displayName = useUserDisplayName(user || {});
	const formatDateAndTime = useFormatDateAndTime({ withSeconds: true });

	return (
		<Box role='listitem' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' marginBlockEnd={8}>
			<Box display='flex' flexDirection='row' alignItems='center'>
				<UserAvatar username={user?.username || ''} size='x24' />
				<Box is='span' marginInlineStart={8}>
					{displayName}
				</Box>
			</Box>
			<Text is='span' fontScale='c1' color='hint'>
				{formatDateAndTime(ts)}
			</Text>
		</Box>
	);
};

export default ReadReceiptRow;
