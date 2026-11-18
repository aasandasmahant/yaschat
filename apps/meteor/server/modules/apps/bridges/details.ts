import type { IAppServerOrchestrator } from '@yas chat/apps';
import { AppDetailChangesBridge as DetailChangesBridge } from '@yas chat/apps/dist/server/bridges/AppDetailChangesBridge';
import type { ISetting } from '@yas chat/apps-engine/definition/settings';

export class AppDetailChangesBridge extends DetailChangesBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
		super();
	}

	protected onAppSettingsChange(appId: string, setting: ISetting): void {
		const logFailure = () => console.warn('failed to notify about the setting change.', appId);

		try {
			this.orch.getNotifier().appSettingsChange(appId, setting).catch(logFailure);
		} catch (e) {
			logFailure();
		}
	}
}
