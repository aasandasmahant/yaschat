export type PriceTier = 'Low' | 'Medium' | 'High';

export interface SourceRating {
	platform: 'YouTube' | 'Reddit' | 'Quora' | 'GoogleTrends' | 'RSS';
	score: string;
	summary: string;
}

export interface ProductMetadata {
	batteryPower: string;
	chargerInBox: boolean;
	chargerType: string;
	chargerQuality: string;
	earphoneInBox: boolean;
	earphoneDetails: string;
	rearCamera: string;
	frontCamera: string;
	ram?: string;
	storage?: string;
	processor?: string;
	display?: string;
	forGamer: string;
	forDailyUser: string;
	forHeavyUser: string;
}

export interface YasChatDiscoveryItem {
	id: string;
	title: string;
	brand: string;
	affiliateNetwork: string;
	buyUrl: string;
	price: number;
	currency: string;
	priceTier: PriceTier;
	tierAudience: string;
	images: string[];
	metadata: ProductMetadata;
	whatYouGet: string[];
	whatYouDontGet: string[];
	prosWhoShouldBuy: string[];
	consWhoShouldAvoid: string[];
	ratings: SourceRating[];
	isValid: boolean;
}

export const resolvePriceTier = (
	price: number,
	targetBudget?: number,
): { tier: PriceTier; audience: string } => {
	if (typeof targetBudget === 'number' && targetBudget > 0) {
		if (price < targetBudget * 0.9) {
			return { tier: 'Low', audience: 'बजट बचत और शुरुआती विकल्प के लिए' };
		}
		if (price <= targetBudget * 1.05) {
			return { tier: 'Medium', audience: 'लक्ष्य बजट के सबसे संतुलित विकल्प के लिए' };
		}
		return { tier: 'High', audience: 'बजट से थोड़े बेहतर फ़ीचर्स चाहने वालों के लिए' };
	}

	if (price <= 500) {
		return { tier: 'Low', audience: 'बजट और शुरुआती यूज़र्स के लिए' };
	}
	if (price <= 2500) {
		return { tier: 'Medium', audience: 'संतुलित और रोज़मर्रा के यूज़र्स के लिए' };
	}
	return { tier: 'High', audience: 'प्रीमियम और हैवी यूज़र्स के लिए' };
};

export const isValidHttpUrl = (url: string): boolean => {
	const trimmed = url.trim();
	return trimmed.startsWith('https://') || trimmed.startsWith('http://');
};

export const normalizeDiscoveryItem = (
	raw: {
		id: string;
		title: string;
		brand?: string;
		affiliateNetwork: string;
		buyUrl: string;
		price: number;
		currency?: string;
		images?: string[];
		metadata?: Partial<ProductMetadata>;
		whatYouGet?: string[];
		whatYouDontGet?: string[];
		prosWhoShouldBuy?: string[];
		consWhoShouldAvoid?: string[];
		ratings?: SourceRating[];
	},
	targetBudget?: number,
): YasChatDiscoveryItem => {
	const cleanTitle = raw.title.trim();
	const validPrice = Number.isFinite(raw.price) && raw.price > 0;
	const validBuyUrl = isValidHttpUrl(raw.buyUrl);
	const cleanImages = (raw.images || []).filter(isValidHttpUrl).slice(0, 5);
	const { tier, audience } = resolvePriceTier(validPrice ? raw.price : 0, targetBudget);

	const chargerInBox = Boolean(raw.metadata?.chargerInBox);
	const earphoneInBox = Boolean(raw.metadata?.earphoneInBox);

	const meta: ProductMetadata = {
		batteryPower: raw.metadata?.batteryPower?.trim() || 'बैटरी जानकारी उपलब्ध नहीं',
		chargerInBox,
		chargerType:
			raw.metadata?.chargerType?.trim() ||
			(chargerInBox ? 'बॉक्स में स्टैंडर्ड चार्जर शामिल' : 'बॉक्स में चार्जर नहीं (केवल केबल)'),
		chargerQuality:
			raw.metadata?.chargerQuality?.trim() ||
			(chargerInBox ? 'ब्रांडेड मानक क्वालिटी' : 'अलग से सर्टिफाइड चार्जर लेना होगा'),
		earphoneInBox,
		earphoneDetails:
			raw.metadata?.earphoneDetails?.trim() ||
			(earphoneInBox ? 'बॉक्स में वायर्ड ईयरफोन शामिल' : 'बॉक्स में ईयरफोन नहीं मिलेगा (अलग से लेना होगा)'),
		rearCamera: raw.metadata?.rearCamera?.trim() || 'रियर कैमरा विवरण उपलब्ध नहीं',
		frontCamera: raw.metadata?.frontCamera?.trim() || 'फ्रंट कैमरा विवरण उपलब्ध नहीं',
		ram: raw.metadata?.ram?.trim() || undefined,
		storage: raw.metadata?.storage?.trim() || undefined,
		processor: raw.metadata?.processor?.trim() || undefined,
		display: raw.metadata?.display?.trim() || undefined,
		forGamer: raw.metadata?.forGamer?.trim() || 'सामान्य/हल्के गेम के लिए उपयुक्त',
		forDailyUser: raw.metadata?.forDailyUser?.trim() || 'रोज़मर्रा के इस्तेमाल के लिए उपयुक्त',
		forHeavyUser: raw.metadata?.forHeavyUser?.trim() || 'मध्यम लोड के लिए उपयुक्त',
	};

	return {
		id: raw.id,
		title: cleanTitle,
		brand: raw.brand?.trim() || 'General',
		affiliateNetwork: raw.affiliateNetwork.trim() || 'Partner',
		buyUrl: raw.buyUrl.trim(),
		price: validPrice ? raw.price : 0,
		currency: raw.currency || '₹',
		priceTier: tier,
		tierAudience: audience,
		images: cleanImages,
		metadata: meta,
		whatYouGet: (raw.whatYouGet || []).filter(Boolean),
		whatYouDontGet: (raw.whatYouDontGet || []).filter(Boolean),
		prosWhoShouldBuy: (raw.prosWhoShouldBuy || []).filter(Boolean),
		consWhoShouldAvoid: (raw.consWhoShouldAvoid || []).filter(Boolean),
		ratings: raw.ratings || [],
		isValid: Boolean(cleanTitle) && validPrice && validBuyUrl && cleanImages.length > 0,
	};
};

const DIGIT_MAP: Record<string, string> = {
	'०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
	'५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
	'٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
	'٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
	'০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
	'৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
};

export const normalizeUniversalDigits = (input: string): string =>
	input
		.split('')
		.map((ch) => DIGIT_MAP[ch] ?? ch)
		.join('')
		.normalize('NFKC');

export const extractBudgetFromQuery = (rawQuery: string): number | undefined => {
	const normalized = normalizeUniversalDigits(rawQuery).toLowerCase().replace(/,/g, '');

	const kMatch = normalized.match(/(\d+(?:\.\d+)?)\s*k\b/);
	if (kMatch) {
		const value = Math.round(parseFloat(kMatch[1]) * 1000);
		return value > 0 ? value : undefined;
	}

	const numMatch = normalized.match(/\b(\d{2,9})\b/);
	if (numMatch) {
		const value = parseInt(numMatch[1], 10);
		return value > 0 ? value : undefined;
	}

	return undefined;
};

export const extractCategoryFromQuery = (rawQuery: string): string => {
	const q = normalizeUniversalDigits(rawQuery).toLowerCase().trim();
	if (!q) {
		return 'general';
	}
	if (
		q.includes('mobile') ||
		q.includes('phone') ||
		q.includes('smartphone') ||
		q.includes('फ़ोन') ||
		q.includes('फोन') ||
		q.includes('मोबाइल')
	) {
		return 'mobile';
	}
	return q;
};

export const pickUniqueBrandByTier = (
	items: YasChatDiscoveryItem[],
	usedBrands: Set<string>,
): Record<PriceTier, YasChatDiscoveryItem | null> => {
	const result: Record<PriceTier, YasChatDiscoveryItem | null> = {
		Low: null,
		Medium: null,
		High: null,
	};

	const tiers: PriceTier[] = ['Low', 'Medium', 'High'];
	const seenInThisSet = new Set<string>();

	for (const tier of tiers) {
		const tierCandidates = items.filter((item) => item.isValid && item.priceTier === tier);
		const freshBrandItem = tierCandidates.find((item) => {
			const key = item.brand.toLowerCase();
			return !usedBrands.has(key) && !seenInThisSet.has(key);
		});

		const fallbackItem =
			freshBrandItem ||
			tierCandidates.find((item) => !seenInThisSet.has(item.brand.toLowerCase())) ||
			tierCandidates[0] ||
			null;

		result[tier] = fallbackItem;
		if (fallbackItem) {
			seenInThisSet.add(fallbackItem.brand.toLowerCase());
		}
	}

	return result;
};

export interface AdminFeedConfig {
	enabled: boolean;
	rssUrls: string[];
	apiUrl: string;
	sourceLabel: string;
}

const ADMIN_FEED_STORAGE_KEY = 'yaschat_admin_feed_config_v1';

export const getDefaultAdminFeedConfig = (): AdminFeedConfig => ({
	enabled: false,
	rssUrls: [],
	apiUrl: '',
	sourceLabel: 'AdminFeed',
});

export const loadAdminFeedConfig = (): AdminFeedConfig => {
	const fallback = getDefaultAdminFeedConfig();
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			const raw = window.localStorage.getItem(ADMIN_FEED_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as Partial<AdminFeedConfig>;
				return {
					enabled: Boolean(parsed.enabled),
					rssUrls: Array.isArray(parsed.rssUrls)
						? parsed.rssUrls.map((u) => String(u).trim()).filter(Boolean)
						: [],
					apiUrl: typeof parsed.apiUrl === 'string' ? parsed.apiUrl.trim() : '',
					sourceLabel:
						typeof parsed.sourceLabel === 'string' && parsed.sourceLabel.trim()
							? parsed.sourceLabel.trim()
							: 'AdminFeed',
				};
			}
		}
	} catch {
		// Safe fallback when storage is unavailable
	}
	return fallback;
};

export const saveAdminFeedConfig = (config: AdminFeedConfig): boolean => {
	try {
		if (typeof window !== 'undefined' && window.localStorage) {
			window.localStorage.setItem(
				ADMIN_FEED_STORAGE_KEY,
				JSON.stringify({
					enabled: Boolean(config.enabled),
					rssUrls: Array.isArray(config.rssUrls)
						? config.rssUrls.map((u) => String(u).trim()).filter(Boolean)
						: [],
					apiUrl: typeof config.apiUrl === 'string' ? config.apiUrl.trim() : '',
					sourceLabel:
						typeof config.sourceLabel === 'string' && config.sourceLabel.trim()
							? config.sourceLabel.trim()
							: 'AdminFeed',
				}),
			);
			return true;
		}
	} catch {
		// Safe fallback when storage is unavailable
	}
	return false;
};
