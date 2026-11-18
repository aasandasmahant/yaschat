import type { ILivechatCustomField } from '@yas chat/core-typings';
import { Callout } from '@yas chat/fuselage';
import { ContextualbarSkeletonBody } from '@yas chat/ui-client';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditCustomFields from './EditCustomFields';

const EditCustomFieldsWithData = ({ customFieldId, onClose }: { customFieldId: ILivechatCustomField['_id']; onClose: () => void }) => {
	const { t } = useTranslation();

	const getCustomFieldById = useEndpoint('GET', '/v1/livechat/custom-fields/:_id', { _id: customFieldId });
	const { data, isPending, isError } = useQuery({
		queryKey: ['livechat-getCustomFieldsById', customFieldId],
		queryFn: async () => getCustomFieldById(),
		refetchOnWindowFocus: false,
	});

	if (isPending) {
		return <ContextualbarSkeletonBody />;
	}

	if (isError) {
		return <Callout type='danger'>{t('Error')}</Callout>;
	}

	return <EditCustomFields customFieldData={data?.customField} onClose={onClose} />;
};

export default EditCustomFieldsWithData;
