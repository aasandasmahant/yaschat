import type { Keys as IconKeys } from '@yaschat/icons';
import { InfoPanelAction } from '@yaschat/ui-client';

type Action = {
	id: string;
	content: string;
	icon: IconKeys;
	onClick: () => void;
	variant?: string;
};

export type RoomInfoActionsProps = {
	actions: { items: Action[] };
	className?: string;
};

const RoomInfoActions = ({ actions, className }: RoomInfoActionsProps) => {
	return (
		<>
			{actions.items.map(({ id, content, icon, onClick }) => (
				<InfoPanelAction className={className} key={id} label={content} onClick={onClick} icon={icon} />
			))}
		</>
	);
};

export default RoomInfoActions;
