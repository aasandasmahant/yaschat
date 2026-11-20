import { FramedIcon, Stack, Text } from '@yaschat/fuselage';
import type { Keys } from '@yaschat/icons';
import type { ReactNode } from 'react';

export type VersionActionItem = {
	danger?: boolean;
	icon: Keys;
	label: ReactNode;
};

export type VersionCardActionItemProps = VersionActionItem;

const VersionCardActionItem = ({ icon, label, danger }: VersionCardActionItemProps) => {
	return (
		<Stack direction='row' align='center' gap='x12'>
			<FramedIcon danger={danger} icon={icon} />
			<Text color={danger ? 'danger' : 'secondary-info'} fontScale='p2m'>
				{label}
			</Text>
		</Stack>
	);
};

export default VersionCardActionItem;
