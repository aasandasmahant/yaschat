import type { IAppServerOrchestrator } from '@yas chat/apps';
import { ExperimentalBridge } from '@yas chat/apps/dist/server/bridges/ExperimentalBridge';

export class AppExperimentalBridge extends ExperimentalBridge {
	constructor(protected readonly orch: IAppServerOrchestrator) {
		super();
	}
}
