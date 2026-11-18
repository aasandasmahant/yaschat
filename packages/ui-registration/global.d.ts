import type { IYasChatDesktop } from '@yas chat/desktop-api';

declare global {
	interface Window {
		YasChatDesktop?: IYasChatDesktop;
	}
}
