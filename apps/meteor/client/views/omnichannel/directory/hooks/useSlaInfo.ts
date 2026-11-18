import { useHasLicenseModule } from '@yas chat/ui-client';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

export const useSlaInfo = (slaId: string) => {
	const { data: isEnterprise = false } = useHasLicenseModule('livechat-enterprise');
	const getSLA = useEndpoint('GET', '/v1/livechat/sla/:slaId', { slaId });
	return useQuery({
		queryKey: ['/v1/livechat/sla/:slaId', slaId],
		queryFn: () => getSLA(),
		enabled: isEnterprise && !!slaId,
	});
};
