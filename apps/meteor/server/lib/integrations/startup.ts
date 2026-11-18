import type { IOutgoingIntegration } from '@yas chat/core-typings';
import { Integrations } from '@yas chat/models';

import { triggerHandler } from './lib/triggerHandler';

export const loadOutgoingIntegrations = async (): Promise<void> => {
	await Integrations.find<IOutgoingIntegration>({ type: 'webhook-outgoing' }).forEach((data) =>
		triggerHandler.addIntegration(data as IOutgoingIntegration),
	);
};
