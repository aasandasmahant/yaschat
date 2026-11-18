import type { ILivechatAgent } from '@yas chat/core-typings';
import { Box } from '@yas chat/fuselage';
import { ContextualbarSkeletonBody } from '@yas chat/ui-client';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import AgentEdit from './AgentEdit';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

export type AgentEditWithDataProps = { uid: ILivechatAgent['_id'] };

const AgentEditWithData = ({ uid }: AgentEditWithDataProps) => {
	const { t } = useTranslation();

	const getAgentById = useEndpoint('GET', '/v1/livechat/users/agent/:_id', { _id: uid });
	const getAgentDepartments = useEndpoint('GET', '/v1/livechat/agents/:agentId/departments', { agentId: uid });

	const { data, isPending, error } = useQuery({
		queryKey: ['livechat-getAgentById', uid],
		queryFn: async () => getAgentById(),
		refetchOnWindowFocus: false,
	});

	const {
		data: agentDepartments,
		isPending: agentDepartmentsLoading,
		error: agentsDepartmentsError,
	} = useQuery({
		queryKey: omnichannelQueryKeys.agentDepartments(uid),
		queryFn: async () => getAgentDepartments(),
		refetchOnWindowFocus: false,
	});

	if (isPending || agentDepartmentsLoading || !agentDepartments) {
		return <ContextualbarSkeletonBody />;
	}

	if (error || agentsDepartmentsError || !data?.user) {
		return <Box padding={16}>{t('User_not_found')}</Box>;
	}

	return <AgentEdit agentData={data.user} agentDepartments={agentDepartments.departments} />;
};

export default AgentEditWithData;
