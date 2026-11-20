import type { OperationResult } from '@yaschat/rest-typings';
import { useEndpoint } from '@yaschat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export const useDepartmentInfo = (departmentId: string): UseQueryResult<OperationResult<'GET', '/v1/livechat/department/:_id'>> => {
	const deptInfo = useEndpoint('GET', `/v1/livechat/department/:_id`, { _id: departmentId });

	return useQuery({
		queryKey: ['livechat/department', departmentId],
		queryFn: () => deptInfo({}),
	});
};
