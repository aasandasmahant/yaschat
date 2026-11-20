import type { IReadReceiptWithUser } from '@yaschat/core-typings';
import { Box, Text } from '@yaschat/fuselage';
import { UserAvatar } from '@yaschat/ui-avatar';
import { useUserDisplayName, useFormatDateAndTime } from '@yaschat/ui-client';

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
