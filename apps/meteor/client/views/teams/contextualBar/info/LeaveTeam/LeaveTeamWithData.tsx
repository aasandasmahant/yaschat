import type { ITeam } from '@yas chat/core-typings';
import { GenericModalSkeleton } from '@yas chat/ui-client';
import { useUserId, useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

import LeaveTeamModal from './LeaveTeamModal/LeaveTeamModal';

export type LeaveTeamWithDataProps = {
	teamId: ITeam['_id'];
	onCancel: () => void;
	onConfirm: () => void;
};

const LeaveTeamWithData = ({ teamId, onCancel, onConfirm }: LeaveTeamWithDataProps) => {
	const userId = useUserId();

	if (!userId) {
		throw Error('No user found');
	}

	const getRoomsOfUser = useEndpoint('GET', '/v1/teams.listRoomsOfUser');
	const { data, isLoading } = useQuery({
		queryKey: ['teams.listRoomsOfUser'],
		queryFn: () => getRoomsOfUser({ teamId, userId }),
	});

	if (isLoading) {
		return <GenericModalSkeleton />;
	}

	return <LeaveTeamModal onCancel={onCancel} onConfirm={onConfirm} rooms={data?.rooms || []} />;
};

export default LeaveTeamWithData;
