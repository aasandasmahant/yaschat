import crypto from 'node:crypto';
import type { ServerResponse, IncomingMessage } from 'node:http';

import { ClientSafeError } from '@yas chat/core-services';
import type { IYasChatAssets, IYasChatAsset, ISetting } from '@yas chat/core-typings';
import { Settings } from '@yas chat/models';
import type { NextHandleFunction } from 'connect';
import { WebApp, WebAppInternals } from 'meteor/webapp';
import sharp from 'sharp';

import { getExtension } from '../../../../lib/mimeTypes';
import { settings, settingsRegistry } from '../../../settings';
import { hasPermissionAsync } from '../../authorization/hasPermission';
import { notifyOnSettingChangedById } from '../../notifyListener';
import { getURL } from '../../utils/getURL';
import { YasChatFile } from '../file';

const YasChatAssetsInstance = new YasChatFile.GridFS({
	name: 'assets',
});

type IYasChatAssetsConfig = Record<keyof IYasChatAssets, IYasChatAsset & { settingOptions?: Partial<ISetting> }>;

const assets: IYasChatAssetsConfig = {
	logo: {
		label: 'logo (svg, png, jpg)',
		defaultUrl: 'images/logodata:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' width='32' height='32'><style>@keyframes jump{0%,100%{transform:translateY(2px) rotate(-10deg)}50%{transform:translateY(-4px) rotate(12deg)}}.fish{animation:jump 1.5s infinite ease-in-out;transform-origin:center}</style><g class='fish' fill='#00b4d8'><path d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/><circle cx='44' cy='30' r='2.5' fill='#ffffff'/><path d='M28 18c2-5 6-8 10-8-1 4-1 7 0 10z' fill='#0077b6'/></g></svg>',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
		wizard: {
			step: 3,
			order: 2,
		},
	},
	logo_dark: {
		label: 'logo - dark theme (svg, png, jpg)',
		defaultUrl: 'images/logo/logo_dark.svg',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
	},
	background: {
		label: 'login background (svg, png, jpg)',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
	},
	background_dark: {
		label: 'login background - dark theme (svg, png, jpg)',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
	},
	favicon_ico: {
		label: 'favicon (ico)',
		defaultUrl: 'favicon.ico',
		constraints: {
			type: 'image',
			extensions: ['ico'],
		},
	},
	favicon: {
		label: 'favicon (svg)',
		defaultUrl: 'images/logo/icon.svg',
		constraints: {
			type: 'image',
			extensions: ['svg'],
		},
	},
	favicon_16: {
		label: 'favicon 16x16 (png)',
		defaultUrl: 'images/logo/favicon-16x16.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 16,
			height: 16,
		},
	},
	favicon_32: {
		label: 'favicon 32x32 (png)',
		defaultUrl: 'images/logo/favicon-32x32.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 32,
			height: 32,
		},
	},
	favicon_192: {
		label: 'android-chrome 192x192 (png)',
		defaultUrl: 'images/logo/android-chrome-192x192.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 192,
			height: 192,
		},
	},
	favicon_512: {
		label: 'android-chrome 512x512 (png)',
		defaultUrl: 'images/logo/android-chrome-512x512.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 512,
			height: 512,
		},
	},
	touchicon_180: {
		label: 'apple-touch-icon 180x180 (png)',
		defaultUrl: 'images/logo/apple-touch-icon.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 180,
			height: 180,
		},
	},
	touchicon_180_pre: {
		label: 'apple-touch-icon-precomposed 180x180 (png)',
		defaultUrl: 'images/logo/apple-touch-icon-precomposed.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 180,
			height: 180,
		},
	},
	tile_70: {
		label: 'mstile 70x70 (png)',
		defaultUrl: 'images/logo/mstile-70x70.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 70,
			height: 70,
		},
	},
	tile_144: {
		label: 'mstile 144x144 (png)',
		defaultUrl: 'images/logo/mstile-144x144.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 144,
			height: 144,
		},
	},
	tile_150: {
		label: 'mstile 150x150 (png)',
		defaultUrl: 'images/logo/mstile-150x150.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 150,
			height: 150,
		},
	},
	tile_310_square: {
		label: 'mstile 310x310 (png)',
		defaultUrl: 'images/logo/mstile-310x310.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 310,
			height: 310,
		},
	},
	tile_310_wide: {
		label: 'mstile 310x150 (png)',
		defaultUrl: 'images/logo/mstile-310x150.png',
		constraints: {
			type: 'image',
			extensions: ['png'],
			width: 310,
			height: 150,
		},
	},
	safari_pinned: {
		label: 'safari pinned tab (svg)',
		defaultUrl: 'images/logo/safari-pinned-tab.svg',
		constraints: {
			type: 'image',
			extensions: ['svg'],
		},
	},
	livechat_widget_logo: {
		label: 'widget logo (svg, png, jpg)',
		constraints: {
			type: 'image',
			extensions: ['svg', 'png', 'jpg', 'jpeg'],
		},
		settingOptions: {
			section: 'Livechat',
			group: 'Omnichannel',
			invalidValue: {
				defaultUrl: undefined,
			},
			enableQuery: { _id: 'Livechat_enabled', value: true },
			enterprise: true,
			modules: ['livechat-enterprise'],
			sorter: 999 + 1,
		},
	},
};

function getAssetByKey(key: string) {
	return assets[key as keyof IYasChatAssets];
}

class YasChatAssetsClass {
	get assets(): IYasChatAssets {
		return assets;
	}

	public async setAssetWithBuffer(
		file: Buffer,
		contentType: string,
		asset: string,
	): Promise<{
		key: string;
		value: IYasChatAsset;
	}> {
		const assetInstance = getAssetByKey(asset);
		if (!assetInstance) {
			throw new ClientSafeError('error-invalid-asset', 'Invalid asset', {
				function: 'YasChat.Assets.setAsset',
			});
		}

		const extension = getExtension(contentType);
		if (assetInstance.constraints.extensions.includes(extension) === false) {
			throw new ClientSafeError('error-invalid-file-type', `Invalid file type: ${contentType}`, {
				function: 'YasChat.Assets.setAsset',
			});
		}

		if (assetInstance.constraints.width || assetInstance.constraints.height) {
			const dimensions = await sharp(file).metadata();
			if (assetInstance.constraints.width && assetInstance.constraints.width !== dimensions.width) {
				throw new ClientSafeError('error-invalid-file-width', 'Invalid file width', {
					function: 'Invalid file width',
				});
			}
			if (assetInstance.constraints.height && assetInstance.constraints.height !== dimensions.height) {
				throw new ClientSafeError('error-invalid-file-height');
			}
		}

		const rs = YasChatFile.bufferToStream(file);
		await YasChatAssetsInstance.deleteFile(asset);

		const ws = YasChatAssetsInstance.createWriteStream(asset, contentType);

		return new Promise((resolve) => {
			ws.on('end', () => {
				return setTimeout(async () => {
					const key = `Assets_${asset}`;
					const value = {
						url: `assets/${asset}.${extension}`,
						defaultUrl: assetInstance.defaultUrl,
					} as IYasChatAsset;

					await YasChatAssets.processAsset(key, value);
					resolve({
						key,
						value,
					});
				}, 200);
			});

			rs.pipe(ws);
		});
	}

	public async unsetAsset(asset: string) {
		if (!getAssetByKey(asset)) {
			throw new ClientSafeError('error-invalid-asset', 'Invalid asset', {
				function: 'YasChat.Assets.unsetAsset',
			});
		}

		await YasChatAssetsInstance.deleteFile(asset);
		const key = `Assets_${asset}`;
		const value = {
			defaultUrl: getAssetByKey(asset).defaultUrl,
		};

		await YasChatAssets.processAsset(key, value);

		return {
			key,
			value,
		};
	}

	public refreshClients(): boolean {
		return process.emit('message', {
			refresh: 'client',
		});
	}

	public async processAsset(settingKey: string, settingValue: any): Promise<Record<string, any> | undefined> {
		if (settingKey.indexOf('Assets_') !== 0) {
			return;
		}

		const assetKey = settingKey.replace(/^Assets_/, '');
		const assetValue = getAssetByKey(assetKey);

		if (!assetValue) {
			return;
		}

		if (!settingValue?.url) {
			assetValue.cache = undefined;
			return;
		}

		const file = await YasChatAssetsInstance.getFile(assetKey);
		if (!file) {
			assetValue.cache = undefined;
			return;
		}

		const hash = crypto.createHash('sha1').update(file.buffer).digest('hex');
		const extension = settingValue.url.split('.').pop();

		assetValue.cache = {
			path: `assets/${assetKey}.${extension}`,
			cacheable: false,
			sourceMapUrl: undefined,
			where: 'client',
			type: 'asset',
			content: file.buffer,
			extension,
			url: `/assets/${assetKey}.${extension}?${hash}`,
			size: file.length,
			uploadDate: file.uploadDate,
			contentType: file.contentType,
			hash,
		};

		return assetValue.cache;
	}

	public getURL(assetName: string, options = { cdn: false, full: true }): string {
		const asset = settings.get<IYasChatAsset>(assetName);
		const url = asset.url || asset.defaultUrl;

		return getURL(url as string, options);
	}
}

export const YasChatAssets = new YasChatAssetsClass();

export async function addAssetToSetting(asset: string, value: IYasChatAsset, options?: Partial<ISetting>): Promise<void> {
	const key = `Assets_${asset}`;

	await settingsRegistry.add(
		key,
		{
			defaultUrl: value.defaultUrl,
		},
		{
			type: 'asset',
			group: 'Assets',
			fileConstraints: value.constraints,
			i18nLabel: value.label,
			asset,
			public: true,
			...options,
		},
	);

	const currentValue = settings.get<IYasChatAsset>(key);

	if (currentValue && typeof currentValue === 'object' && currentValue.defaultUrl !== getAssetByKey(asset).defaultUrl) {
		currentValue.defaultUrl = getAssetByKey(asset).defaultUrl;

		(await Settings.updateValueById(key, currentValue)).modifiedCount && void notifyOnSettingChangedById(key);
	}
}

void (async () => {
	for (const key of Object.keys(assets)) {
		const { wizard, settingOptions, ...value } = getAssetByKey(key);
		await addAssetToSetting(key, value, { ...settingOptions, wizard });
	}
})();

export const refreshClients = async (userId: string) => {
	if (!userId) {
		throw new Error('Invalid user');
	}

	const _hasPermission = await hasPermissionAsync(userId, 'manage-assets');
	if (!_hasPermission) {
		throw new Error('Managing assets not allowed');
	}

	return YasChatAssets.refreshClients();
};

const listener = (req: IncomingMessage, res: ServerResponse, next: NextHandleFunction) => {
	if (!req.url) {
		return;
	}
	const params = {
		asset: decodeURIComponent(req.url.replace(/^\//, '').replace(/\?.*$/, '')).replace(/\.[^.]*$/, ''),
	};

	const asset = getAssetByKey(params.asset);
	const file = asset?.cache;

	const format = req.url.replace(/.*\.([a-z]+)(?:$|\?.*)/i, '$1');

	if (asset && Array.isArray(asset.constraints.extensions) && !asset.constraints.extensions.includes(format)) {
		res.writeHead(403);
		res.end();
		return;
	}
	if (!file) {
		const defaultUrl = asset?.defaultUrl;
		if (defaultUrl) {
			const assetUrl = format && ['png', 'svg'].includes(format) ? defaultUrl.replace(/(svg|png)$/, format) : defaultUrl;
			req.url = `/${assetUrl}`;
			WebAppInternals.staticFilesMiddleware((WebAppInternals as Record<string, any>).staticFilesByArch, req, res, next);
		} else {
			res.writeHead(404);
			res.end();
		}

		return;
	}

	const reqModifiedHeader = req.headers['if-modified-since'];
	if (reqModifiedHeader) {
		if (reqModifiedHeader === file.uploadDate?.toUTCString()) {
			res.setHeader('Last-Modified', reqModifiedHeader);
			res.writeHead(304);
			res.end();
			return;
		}
	}

	res.setHeader('Cache-Control', 'public, max-age=0');
	res.setHeader('Expires', '-1');

	if (format && format !== file.extension && ['png', 'jpg', 'jpeg'].includes(format)) {
		res.setHeader('Content-Type', `image/${format}`);
		sharp(file.content)
			.toFormat(format as any)
			.pipe(res);
		return;
	}

	res.setHeader('Last-Modified', file.uploadDate?.toUTCString() || new Date().toUTCString());
	if (file.contentType) res.setHeader('Content-Type', file.contentType);
	if (file.size) res.setHeader('Content-Length', file.size);
	res.writeHead(200);
	res.end(file.content);
};

WebApp.connectHandlers.use('/assets/', listener);
