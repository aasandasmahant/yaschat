import { Button } from '@yas chat/fuselage';
import type { Keys as IconName } from '@yas chat/icons';
import type { ComponentProps, ReactNode } from 'react';

export type InfoPanelActionProps = Omit<ComponentProps<typeof Button>, 'label'> & {
	icon?: IconName;
	label: ReactNode;
};

const InfoPanelAction = ({ label, icon, ...props }: InfoPanelActionProps) => (
	<Button
		title={typeof label === 'string' ? label : undefined}
		aria-label={typeof label === 'string' ? label : undefined}
		{...props}
		icon={icon}
	>
		{label}
	</Button>
);

export default InfoPanelAction;
