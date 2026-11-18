import type { IRoom, Serialized } from '@yas chat/core-typings';
import { CheckBox, Margins } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { GenericTableRow, GenericTableCell } from '@yas chat/ui-client';

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
