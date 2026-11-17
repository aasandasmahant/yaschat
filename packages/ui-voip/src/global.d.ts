import type { IYasChatDesktop } from '@rocket.chat/desktop-api';

declare global {
	interface Window {
		YasChatDesktop?: IYasChatDesktop;
	}
}
