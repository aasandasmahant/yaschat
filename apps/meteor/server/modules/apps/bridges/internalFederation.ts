import type { IInternalFederationBridge } from '@yas chat/apps/dist/server/bridges/IInternalFederationBridge';
import { FederationKeys } from '@yas chat/models';

export class AppInternalFederationBridge implements IInternalFederationBridge {
	async getPrivateKey(): Promise<string | null> {
		return FederationKeys.getKey('private');
	}

	async getPublicKey(): Promise<string | null> {
		return FederationKeys.getKey('public');
	}
}
