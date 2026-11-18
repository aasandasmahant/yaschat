import { Box, Icon } from '@yas chat/fuselage';
import type { Keys as IconName } from '@yas chat/icons';

const iconMap: Record<string, IconName> = {
	'browser': 'desktop',
	'mobile': 'mobile',
	'desktop-app': 'desktop',
	'mobile-app': 'mobile',
};

export type DeviceIconProps = { deviceType: string };

const DeviceIcon = ({ deviceType }: DeviceIconProps) => (
	<Box
		is='span'
		display='inline-flex'
		alignItems='center'
		justifyContent='center'
		padding={4}
		backgroundColor='selected'
		color='hint'
		size='x24'
		borderRadius='full'
		marginInlineEnd={8}
	>
		<Icon name={iconMap[deviceType] || 'globe'} size='x16' />
	</Box>
);

export default DeviceIcon;
