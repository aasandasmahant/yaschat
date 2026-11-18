import type { ILivechatBusinessHour, LivechatBusinessHourTypes } from '@yas chat/core-typings';
import { Button, States, StatesAction, StatesActions, StatesIcon, StatesTitle } from '@yas chat/fuselage';
import { Page, PageHeader, PageContent, PageSkeleton } from '@yas chat/ui-client';
import { useEndpoint, useRouter } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import EditBusinessHours from './EditBusinessHours';

export type EditBusinessHoursWidthDataProps = { id?: ILivechatBusinessHour['_id']; type: LivechatBusinessHourTypes };

const EditBusinessHoursWidthData = ({ id, type }: EditBusinessHoursWidthDataProps) => {
	const { t } = useTranslation();
	const router = useRouter();
	const getBusinessHour = useEndpoint('GET', '/v1/livechat/business-hour');

	const { data, isPending, isError, refetch } = useQuery({
		queryKey: ['livechat-getBusinessHourById', id, type],
		queryFn: async () => getBusinessHour({ _id: id, type }),
		refetchOnWindowFocus: false,
	});

	if (isPending) {
		return <PageSkeleton />;
	}

	if (isError) {
		return (
			<Page>
				<PageHeader title={t('Business_Hours')}>
					<Button onClick={() => router.navigate('/omnichannel/businessHours')}>{t('Back')}</Button>
				</PageHeader>
				<PageContent>
					<States>
						<StatesIcon name='warning' variation='danger' />
						<StatesTitle>{t('Something_went_wrong')}</StatesTitle>
						<StatesActions>
							<StatesAction onClick={() => refetch()}>{t('Reload_page')}</StatesAction>
						</StatesActions>
					</States>
				</PageContent>
			</Page>
		);
	}

	return <EditBusinessHours businessHourData={data.businessHour} type={type} />;
};

export default EditBusinessHoursWidthData;
