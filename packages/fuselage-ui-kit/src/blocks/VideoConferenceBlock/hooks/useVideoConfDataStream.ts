import type { IRoom } from '@yas chat/core-typings';
import { useStream } from '@yas chat/ui-contexts';
import { useVideoConferenceInfo, videoConferenceInfoQueryKey } from '@yas chat/ui-video-conf';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useVideoConfDataStream = ({ rid, callId }: { rid: IRoom['_id']; callId: string }) => {
	const queryClient = useQueryClient();

	const subscribeNotifyRoom = useStream('notify-room');

	useEffect(
		() =>
			subscribeNotifyRoom(
				`${rid}/videoconf`,
				(id) =>
					id === callId &&
					queryClient.invalidateQueries({
						queryKey: videoConferenceInfoQueryKey(callId),
					}),
			),
		[rid, callId, subscribeNotifyRoom, queryClient],
	);

	return useVideoConferenceInfo(callId);
};
