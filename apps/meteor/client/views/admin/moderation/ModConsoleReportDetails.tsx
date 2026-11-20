import type { IUser } from '@yaschat/core-typings';
import { Box, Tabs, TabsItem } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { ContextualbarClose, ContextualbarDialog, ContextualbarHeader, ContextualbarTitle } from '@yaschat/ui-client';
import { useRouter, useRouteParameter } from '@yaschat/ui-contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import UserMessages from './UserMessages';
import UserReportInfo from './UserReports/UserReportInfo';

export type ModConsoleReportDetailsProps = {
	userId: IUser['_id'];
	default: string;
	onRedirect: (mid: string) => void;
};

const ModConsoleReportDetails = ({ userId, default: defaultTab, onRedirect }: ModConsoleReportDetailsProps) => {
	const { t } = useTranslation();
	const [tab, setTab] = useState<string>(defaultTab);
	const moderationRoute = useRouter();

	const activeTab = useRouteParameter('tab');

	const handleCloseContextualbar = useStableCallback(() => moderationRoute.navigate(`/admin/moderation/${activeTab}`, { replace: true }));

	return (
		<ContextualbarDialog onClose={handleCloseContextualbar}>
			<ContextualbarHeader>
				<ContextualbarTitle>{t('Reports')}</ContextualbarTitle>
				<ContextualbarClose onClick={handleCloseContextualbar} />
			</ContextualbarHeader>
			<Box paddingBlockStart={8}>
				<Tabs>
					<TabsItem selected={tab === 'messages'} onClick={() => setTab('messages')}>
						{t('Messages')}
					</TabsItem>
					<TabsItem selected={tab === 'users'} onClick={() => setTab('users')}>
						{t('User')}
					</TabsItem>
				</Tabs>
			</Box>
			{tab === 'messages' && <UserMessages userId={userId} onRedirect={onRedirect} />}
			{tab === 'users' && <UserReportInfo userId={userId} />}
		</ContextualbarDialog>
	);
};

export default ModConsoleReportDetails;
