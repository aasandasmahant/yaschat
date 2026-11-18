import type { App } from '@yas chat/core-typings';
import { Accordion } from '@yas chat/fuselage';
import { useEndpoint } from '@yas chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import AppReleasesItem from './AppReleasesItem';
import AccordionLoading from '../../../components/AccordionLoading';

export type AppReleasesProps = { id: App['id'] };

const AppReleases = ({ id }: AppReleasesProps) => {
	const getVersions = useEndpoint('GET', '/apps/:id/versions', { id });
	const { t } = useTranslation();

	const { data, isLoading, isFetched } = useQuery({
		queryKey: ['apps', id, 'versions'],
		queryFn: async () => {
			const { apps } = await getVersions();

			if (apps.length === 0) {
				throw new Error(t('No_results_found'));
			}
			return apps;
		},
		meta: {
			apiErrorToastMessage: true,
		},
	});

	return (
		<>
			<Accordion>
				{isLoading && <AccordionLoading />}
				{isFetched && (
					<>
						{data?.map((release) => (
							<AppReleasesItem release={release} key={release.version} />
						))}
					</>
				)}
			</Accordion>
		</>
	);
};

export default AppReleases;
