import { EVENT_RESULT_KIND } from '@yas chat/apps-engine/definition/eventResult';
import type { MarkedEventResult } from '@yas chat/apps-engine/definition/eventResult';

/**
 * Runtime guard for the `EventResult` marker.
 */
export function isEventResult(value: unknown): value is MarkedEventResult {
	return typeof value === 'object' && value?.['@kind'] === EVENT_RESULT_KIND;
}
