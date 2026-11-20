import { Button } from '@yaschat/fuselage';
import type { Keys as IconName } from '@yaschat/icons';
import type { HTMLAttributes } from 'react';

export type AgentInfoActionProps = {
	icon: IconName;
	label?: string;
	title?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'is'>;

const AgentInfoAction = ({ icon, label, ...props }: AgentInfoActionProps) => (
	<Button icon={icon} title={label} {...props}>
		{label}
	</Button>
);

export default AgentInfoAction;
