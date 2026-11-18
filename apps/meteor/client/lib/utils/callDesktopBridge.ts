import type { IYasChatDesktop } from '@yas chat/desktop-api';

/**
 * Calls the desktop app bridge (`window.YasChatDesktop`) when it is present, and returns the result of the call.
 * The desktop code ships on its own release cycle, so a failed call is logged and returns `undefined` instead of
 * crashing the web client.
 */
export const callDesktopBridge = <T>(call: (desktop: IYasChatDesktop) => T): T | undefined => {
	const desktop = typeof window === 'undefined' ? undefined : window.YasChatDesktop;
	if (!desktop) return undefined;

	try {
		return call(desktop);
	} catch (error) {
		console.warn('The desktop app bridge call failed', error);
		return undefined;
	}
};
