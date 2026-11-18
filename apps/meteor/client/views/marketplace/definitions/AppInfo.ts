import type { IApiEndpointMetadata } from '@yas chat/apps-engine/definition/api';
import type { AppScreenshot } from '@yas chat/core-typings';

import type { ISettings } from './ISettings';
import type { App } from '../types';

export type AppInfo = App & {
	settings?: ISettings;
	apis: Array<IApiEndpointMetadata>;
	screenshots: Array<AppScreenshot>;
};
