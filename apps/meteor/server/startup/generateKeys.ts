import { FederationKeys } from '@yas chat/models';

// Create key pair if needed
export async function generateFederationKeys() {
	if (!(await FederationKeys.getPublicKey())) {
		await FederationKeys.generateKeys();
	}
}
