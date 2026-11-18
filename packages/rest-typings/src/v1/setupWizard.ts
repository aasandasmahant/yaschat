import type { ISetting } from '@yas chat/core-typings';

export type SetupWizardEndpoints = {
	'/v1/setupWizard.parameters': {
		GET: () => {
			settings: ISetting[];
			serverAlreadyRegistered: boolean;
		};
	};
};
