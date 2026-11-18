import type { App } from '@yas chat/apps-engine/definition/App';
import type { AppStatus } from '@yas chat/apps-engine/definition/AppStatus';

import { AppObjectRegistry } from '../../AppObjectRegistry';

export default function handleGetStatus(): Promise<AppStatus> {
	const app = AppObjectRegistry.get<App>('app');

	if (typeof app?.getStatus !== 'function') {
		throw new Error('App must contain a getStatus function', {
			cause: 'invalid_app',
		});
	}

	return app.getStatus();
}
