export interface IYasChatAssetConstraint {
	type: string;
	extensions: string[];
	width?: number;
	height?: number;
}

export interface IYasChatAssetCache {
	path: string;
	cacheable: boolean;
	where: string;
	type: string;
	content?: Buffer;
	extension?: string;
	url: string;
	size?: number;
	uploadDate?: Date;
	contentType?: string;
	hash: string;
	sourceMapUrl?: string;
}

export interface IYasChatAsset {
	label: string;
	constraints: IYasChatAssetConstraint;
	defaultUrl?: string;
	url?: string;
	wizard?: {
		step: number;
		order: number;
	};
	cache?: IYasChatAssetCache;
}

export interface IYasChatAssets {
	logo: IYasChatAsset;
	logo_dark: IYasChatAsset;
	background: IYasChatAsset;
	background_dark: IYasChatAsset;
	favicon_ico: IYasChatAsset;
	favicon: IYasChatAsset;
	favicon_16: IYasChatAsset;
	favicon_32: IYasChatAsset;
	favicon_192: IYasChatAsset;
	favicon_512: IYasChatAsset;
	touchicon_180: IYasChatAsset;
	touchicon_180_pre: IYasChatAsset;
	tile_70: IYasChatAsset;
	tile_144: IYasChatAsset;
	tile_150: IYasChatAsset;
	tile_310_square: IYasChatAsset;
	tile_310_wide: IYasChatAsset;
	safari_pinned: IYasChatAsset;
	livechat_widget_logo: IYasChatAsset;
}
