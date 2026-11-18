import type { YasChatI18nKeys } from '@yas chat/i18n';

import type { Importer } from '../classes/Importer';

export type ImporterInfo = {
	key: string;
	name: YasChatI18nKeys;
	visible: boolean; // Determines if this importer can be selected by the user in the New Import screen.
	importer: typeof Importer;
};
