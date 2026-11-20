import type { IRoom, Serialized } from '@yaschat/core-typings';
import { CheckBox, Margins } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { GenericTableRow, GenericTableCell } from '@yaschat/ui-client';

import { RoomIcon } from '../../../../../../components/RoomIcon';

export type ChannelDeletionTableRowProps = {
	room: Serialized<IRoom>;
	onChange: (room: Serialized<IRoom>) => void;
	selected: boolean;
};

const ChannelDeletionTableRow = ({ room, onChange, selected }: ChannelDeletionTableRowProps) => {
	const { name, fname, usersCount } = room;
	const handleChange = useStableCallback(() => onChange(room));

	return (
		<GenericTableRow action>
			<GenericTableCell truncate>
				<CheckBox checked={selected} onChange={handleChange} />
				<Margins inline='x8'>
					<RoomIcon room={room} />
					{fname ?? name}
				</Margins>
			</GenericTableCell>
			<GenericTableCell align='end' truncate>
				{usersCount}
			</GenericTableCell>
		</GenericTableRow>
	);
};

export default ChannelDeletionTableRow;
