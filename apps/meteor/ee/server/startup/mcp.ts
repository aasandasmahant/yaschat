import { AI_LICENSE_MODULE } from '@yas chat/ai-search';
import { License } from '@yas chat/license';
import { Permissions } from '@yas chat/models';

await License.onLicense(AI_LICENSE_MODULE, async () => {
	await Permissions.create('access-mcp', ['admin']);
});
