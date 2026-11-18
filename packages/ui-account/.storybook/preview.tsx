import { mockAppRoot } from '@yas chat/mock-providers';
import { appRootDecorator, languageGlobalTypes, languageInitialGlobals } from '@yas chat/storybook-config/app-root';
import { parameters, decorators } from '@yas chat/storybook-config/preview';
import type { Preview } from '@storybook/react';

const preview: Preview = {
	parameters: {
		...parameters,
	},
	decorators: [...decorators, appRootDecorator(mockAppRoot)],
	globalTypes: languageGlobalTypes,
	initialGlobals: languageInitialGlobals,
};

export default preview;
