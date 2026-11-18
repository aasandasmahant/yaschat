import { MediaCall } from '@yas chat/core-services';
import { License } from '@yas chat/license';

import { addSettings } from '../settings/voip';

License.onValidateLicense(async () => {
	await addSettings();

	await MediaCall.hangupExpiredCalls();
});
