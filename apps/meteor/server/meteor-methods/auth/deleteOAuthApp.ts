import { ClientSafeError } from '@yas chat/core-services';
import type { IOAuthApps } from '@yas chat/core-typings';
import { OAuthAccessTokens, OAuthApps, OAuthAuthCodes } from '@yas chat/models';

import { hasPermissionAsync } from '../../lib/authorization/hasPermission';

export const deleteOAuthApp = async (userId: string, applicationId: IOAuthApps['_id']): Promise<boolean> => {
	if (!(await hasPermissionAsync(userId, 'manage-oauth-apps'))) {
		throw new ClientSafeError('error-not-allowed', 'Not allowed', { method: 'deleteOAuthApp' });
	}

	const application = await OAuthApps.findOneAndDeleteById(applicationId, { projection: { clientId: 1 } });
	if (!application) {
		throw new ClientSafeError('error-application-not-found', 'Application not found', {
			method: 'deleteOAuthApp',
		});
	}

	await OAuthAccessTokens.deleteMany({ clientId: application.clientId });
	await OAuthAuthCodes.deleteMany({ clientId: application.clientId });

	return true;
};
