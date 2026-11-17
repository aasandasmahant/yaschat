import { YasChatAssets } from '../lib/media/assets';
import type { ICachedSettings } from '../settings/CachedSettings';

export async function configureAssets(settings: ICachedSettings): Promise<void> {
	settings.watchByRegex(/^Assets_/, (key, value) => YasChatAssets.processAsset(key, value));
}
