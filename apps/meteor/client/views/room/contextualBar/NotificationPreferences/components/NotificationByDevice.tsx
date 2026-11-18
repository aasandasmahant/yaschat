import { Box, AccordionItem, Icon, FieldGroup } from '@yas chat/fuselage';
import type { Keys as IconName } from '@yas chat/icons';
import type { ReactNode } from 'react';
import { memo } from 'react';

export type NotificationByDeviceProps = {
	device: string;
	icon: IconName;
	children: ReactNode;
};

const NotificationByDevice = ({ device, icon, children }: NotificationByDeviceProps) => (
	<AccordionItem
		title={
			<Box display='flex' alignItems='center'>
				<Icon name={icon} size='x18' />
				<Box fontScale='p2m' marginInline={16}>
					{device}
				</Box>
			</Box>
		}
	>
		<FieldGroup>{children}</FieldGroup>
	</AccordionItem>
);

export default memo(NotificationByDevice);
