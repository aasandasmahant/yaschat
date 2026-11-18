import type { ProxiedApp } from '@yas chat/apps/dist/server/ProxiedApp';
import type { AppLicenseValidationResult } from '@yas chat/apps/dist/server/marketplace/license/AppLicenseValidationResult';
import type { IAppStorageItem } from '@yas chat/apps/dist/server/storage/IAppStorageItem';
import type { AppStatus } from '@yas chat/apps-engine/definition/AppStatus';
import type { IAppInfo } from '@yas chat/apps-engine/definition/metadata';
import type { AppStatusReport } from '@yas chat/core-services';
import type { App } from '@yas chat/core-typings';

import { getInstallationSourceFromAppStorageItem } from '../../../lib/apps/getInstallationSourceFromAppStorageItem';

interface IAppInfoRest extends IAppInfo {
	status: AppStatus;
	languages: IAppStorageItem['languageContent'];
	licenseValidation?: AppLicenseValidationResult;
	private: boolean;
	migrated: boolean;
	clusterStatus?: App['clusterStatus'];
}

export async function formatAppInstanceForRest(app: ProxiedApp, clusterStatus?: AppStatusReport): Promise<IAppInfoRest> {
	const appRest: IAppInfoRest = {
		...app.getInfo(),
		status: await app.getStatus(),
		languages: app.getStorageItem().languageContent,
		private: getInstallationSourceFromAppStorageItem(app.getStorageItem()) === 'private',
		migrated: !!app.getStorageItem().migrated,
	};

	if (clusterStatus?.[app.getID()]) {
		appRest.clusterStatus = clusterStatus[app.getID()];
	}

	const licenseValidation = app.getLatestLicenseValidationResult();

	if (licenseValidation?.hasErrors || licenseValidation?.hasWarnings) {
		appRest.licenseValidation = licenseValidation;
	}

	return appRest;
}
