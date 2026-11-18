import type { IWorkspaceInfo } from '@yas chat/core-typings';
import { License } from '@yas chat/license';

import { getTrimmedServerVersion } from './getTrimmedServerVersion';
import { Info, minimumClientVersions } from '../../../yaschat.info';
import { hasPermissionAsync } from '../../lib/authorization/hasPermission';
import { getCachedSupportedVersionsToken, wrapPromise } from '../../lib/cloud/supportedVersionsToken/supportedVersionsToken';
import { settings } from '../../settings';

export async function getServerInfo(userId?: string): Promise<IWorkspaceInfo> {
	const hasPermissionToViewStatistics = userId && (await hasPermissionAsync(userId, 'view-statistics'));
	const supportedVersionsToken = await wrapPromise(getCachedSupportedVersionsToken());
	const cloudWorkspaceId = settings.get<string | undefined>('Cloud_Workspace_Id');

	return {
		workspaceUrl: License.getWorkspaceUrl(),
		hashedWorkspaceUrl: License.getHashedWorkspaceUrl(),
		version: getTrimmedServerVersion(),
		...(hasPermissionToViewStatistics && {
			info: {
				...Info,
			},
			version: Info.version,
		}),

		minimumClientVersions,
		...(supportedVersionsToken.success &&
			supportedVersionsToken.result && {
				supportedVersions: { signed: supportedVersionsToken.result },
			}),

		cloudWorkspaceId,
	};
}
