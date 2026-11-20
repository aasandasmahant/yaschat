import type { IIntegration, Serialized } from '@yaschat/core-typings';
import { Text } from '@yaschat/fuselage';
import { GenericTableCell, GenericTableRow, useFormatDateAndTime } from '@yaschat/ui-client';

export type IntegrationRowProps = {
	integration: Serialized<IIntegration>;
	isMobile: boolean;
	onClick: (_id: string, type: string) => () => void;
};

const IntegrationRow = ({ integration, onClick, isMobile }: IntegrationRowProps) => {
	const formatDateAndTime = useFormatDateAndTime();
	const { _id, name, type, username, _createdAt, _createdBy, channel } = integration;

	return (
		<GenericTableRow key={_id} onKeyDown={onClick(_id, type)} onClick={onClick(_id, type)} tabIndex={0} role='link' action>
			<GenericTableCell>
				<Text truncate>{name}</Text>
			</GenericTableCell>
			<GenericTableCell>
				<Text truncate>{channel.join(', ')}</Text>
			</GenericTableCell>
			<GenericTableCell>
				<Text truncate>{_createdBy?.username}</Text>
			</GenericTableCell>
			{!isMobile && (
				<GenericTableCell>
					<Text truncate>{formatDateAndTime(_createdAt)}</Text>
				</GenericTableCell>
			)}
			<GenericTableCell>
				<Text truncate>{username}</Text>
			</GenericTableCell>
		</GenericTableRow>
	);
};

export default IntegrationRow;
