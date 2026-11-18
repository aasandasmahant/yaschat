import { License } from '@yas chat/license';

import { Importers } from '..';
import { ContactImporter } from './ContactImporter';

License.onValidFeature('contact-id-verification', () => {
	Importers.add({
		key: 'omnichannel_contact',
		name: 'omnichannel_contacts_importer',
		importer: ContactImporter,
	});
});
