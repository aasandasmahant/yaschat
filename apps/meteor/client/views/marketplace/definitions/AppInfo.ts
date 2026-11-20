import type { IApiEndpointMetadata } from '@yaschat/apps-engine/definition/api';
import type { AppScreenshot } from '@yaschat/core-typings';

import type { ISettings } from './ISettings';
import type { App } from '../types';

export type AppInfo = App & {
	settings?: ISettings;
	apis: Array<IApiEndpointMetadata>;
	screenshots: Array<AppScreenshot>;
};
