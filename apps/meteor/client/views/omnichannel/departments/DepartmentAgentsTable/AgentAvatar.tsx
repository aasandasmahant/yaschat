import { Box, Text } from '@yaschat/fuselage';
import { useMediaQuery } from '@yaschat/fuselage-hooks';
import { UserAvatar } from '@yaschat/ui-avatar';
import { memo } from 'react';

export type AgentAvatarProps = { name: string; username: string; eTag?: string };

const AgentAvatar = ({ name, username, eTag }: AgentAvatarProps) => {
	const mediaQuery = useMediaQuery('(min-width: 1024px)');

	return (
		<Box display='flex' alignItems='center'>
			<UserAvatar size={mediaQuery ? 'x28' : 'x40'} title={username} username={username} etag={eTag} />
			<Box display='flex' withTruncatedText marginInline={8}>
				<Box display='flex' flexDirection='column' alignSelf='center' withTruncatedText>
					<Text fontScale='p2m' truncate color='default'>
						{name || username}
					</Text>
					{!mediaQuery && name && (
						<Text fontScale='p2' color='hint' truncate>
							{' '}
							{`@${username}`}{' '}
						</Text>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default memo(AgentAvatar);
