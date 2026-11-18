import 'reflect-metadata';

export { validateFederatedUsername } from './helpers/validateFederatedUsername';

export { isReservedByExclusiveBridge } from './helpers/isReservedByExclusiveBridge';

export { FederationMatrix } from './FederationMatrix';

export { generateEd25519RandomSecretKey } from '@yas chat/federation-sdk';

export { getFederationRoutes } from './api/routes';

export { setupFederationMatrix, configureFederationMatrixSettings } from './setup';
