import type { IUpload } from '@yas chat/core-typings';

import type { IAppsUpload } from '../AppsEngine';

export interface IAppUploadsConverter {
	convertById(uploadId: string): Promise<IAppsUpload | undefined>;
	convertToApp(upload: undefined | null): Promise<undefined>;
	convertToApp(upload: IUpload): Promise<IAppsUpload>;
	convertToApp(upload: IUpload | undefined | null): Promise<IAppsUpload | undefined>;
	convertToYasChat(upload: undefined | null): undefined;
	convertToYasChat(upload: IAppsUpload): IUpload;
	convertToYasChat(upload: IAppsUpload | undefined | null): IUpload | undefined;
}
