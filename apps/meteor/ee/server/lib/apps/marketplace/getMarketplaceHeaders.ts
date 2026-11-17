import { Info } from '../../../../../yaschat.info';

export function getMarketplaceHeaders(): Record<string, any> {
	return {
		'X-Apps-Engine-Version': Info.marketplaceApiVersion.replace(/-.*/g, ''),
	};
}
