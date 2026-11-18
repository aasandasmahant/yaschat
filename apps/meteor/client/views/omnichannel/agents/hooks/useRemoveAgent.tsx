import type { ILivechatAgent } from '@yas chat/core-typings';
import { useConfirmAction } from '@yas chat/ui-client';
import { useRouter, useEndpoint } from '@yas chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { omnichannelQueryKeys } from '../../../../lib/queryKeys';

export const useRemoveAgent = (uid: ILivechatAgent['_id']) => {
	const { t } = useTranslation();
	const router = useRouter();
	const queryClient = useQueryClient();
	const deleteAction = useEndpoint('DELETE', '/v1/livechat/users/agent/:_id', { _id: uid });

	return useConfirmAction(
		async () => {
			await deleteAction();
			router.navigate('/omnichannel/agents');
			queryClient.invalidateQueries({ queryKey: omnichannelQueryKeys.agents() });
			queryClient.invalidateQueries({ queryKey: omnichannelQueryKeys.agentDepartments(uid) });
		},
		{ successMessage: t('Agent_removed') },
	);
};
