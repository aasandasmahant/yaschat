import type { IAppServerOrchestrator, IAppSettingsConverter, IAppsSetting } from '@yas chat/apps';
import type { ISetting } from '@yas chat/core-typings';
import { Settings } from '@yas chat/models';
import * as z from 'zod';

import { SettingCodec } from './codecs';

export class AppSettingsConverter implements IAppSettingsConverter {
	constructor(protected readonly orch: IAppServerOrchestrator) {
		this.orch = orch;
	}

	async convertById(settingId: ISetting['_id']): Promise<IAppsSetting> {
		const setting = await Settings.findOneById(settingId);

		return this.convertToApp(setting as ISetting);
	}

	convertToApp(setting: ISetting): IAppsSetting {
		return z.decode(SettingCodec, setting);
	}
}
