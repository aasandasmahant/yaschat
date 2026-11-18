import { mockAppRoot } from '@yas chat/mock-providers';
import { appRootDecorator, languageGlobalTypes, languageInitialGlobals } from '@yas chat/storybook-config/app-root';
import { parameters, decorators } from '@yas chat/storybook-config/preview';
import type { Preview } from '@storybook/react';

import { YasChatDecorator } from './decorators';

import '../client/styles/main.css';
import 'highlight.js/styles/github.css';

const preview: Preview = {
	parameters: {
		...parameters,
	},
	decorators: [...decorators, YasChatDecorator, appRootDecorator(mockAppRoot)],
	globalTypes: languageGlobalTypes,
	initialGlobals: languageInitialGlobals,
	tags: ['autodocs'],
};

export default preview;
