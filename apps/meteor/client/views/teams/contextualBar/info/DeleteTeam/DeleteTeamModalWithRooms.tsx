import type { IRoom } from '@yas chat/core-typings';
import { GenericModalSkeleton } from '@yas chat/ui-client';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import DeleteTeamModal from './DeleteTeamModal';

export type DeleteTeamModalWithRoomsProps = {
	teamId: string;
	onConfirm: (roomsToDelete: IRoom['_id'][]) => void;
	onCancel: () => void;
};

const DeleteTeamModalWithRooms = ({ teamId, onConfirm, onCancel }: DeleteTeamModalWithRoomsProps) => {
	const query = useMemo(() => ({ teamId }), [teamId]);
	const getTeamsListRooms = useEndpoint('GET', '/v1/teams.listRooms');
	const { data, isLoading } = useQuery({
		queryKey: ['getTeamsListRooms', query],
		queryFn: async () => getTeamsListRooms(query),
	});

	if (isLoading) {
		return <GenericModalSkeleton />;
	}
	return <DeleteTeamModal onCancel={onCancel} onConfirm={onConfirm} rooms={data?.rooms || []} />;
};

export default DeleteTeamModalWithRooms;
