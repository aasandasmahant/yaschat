import type { App } from '@yaschat/core-typings';
import { Box, CardGroup } from '@yaschat/fuselage';

import AppRow from './AppRow';

export type AppsListProps = {
	apps: App[];
	title?: string;
	appsListId: string;
};

const AppsList = ({ apps, title, appsListId }: AppsListProps) => {
	return (
		<Box marginBlockEnd={16}>
			{title && (
				<Box is='h2' id={appsListId} fontScale='h3' color='default' marginBlockEnd={20}>
					{title}
				</Box>
			)}
			<CardGroup vertical stretch aria-labelledby={appsListId} role='list'>
				{apps.map((app) => (
					<AppRow key={app.id} {...app} />
				))}
			</CardGroup>
		</Box>
	);
};

export default AppsList;
