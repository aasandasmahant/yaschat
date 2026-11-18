import type { IYasChatDesktop, IVideoCallWindow } from '@yas chat/desktop-api';

declare global {
	interface Window {
		YasChatDesktop?: IYasChatDesktop;
		/** @deprecated Desktop 4.15–4.17 only; 4.18 and later expose it as `YasChatDesktop.videoCall`. */
		videoCallWindow?: IVideoCallWindow;
		opera?: string;
		/** Logs in with a resume token through the same path as a page load; end-to-end specs use it. */
		__YasChatLoginWithToken?: (token: string) => Promise<void>;
		/** Calls a server method through the same path as the UI; end-to-end specs use it. */
		__YasChatCallMethod?: (method: string, ...args: unknown[]) => Promise<unknown>;
		/** The client's end-to-end encryption state; end-to-end specs use it. */
		__YasChatE2E?: typeof import('../lib/e2ee/yaschat.e2e').e2e;
	}

	interface Navigator {
		/** @deprecated use the newer `navigator.mediaDevices.getUserMedia()` instead */
		getUserMedia?: (
			this: Navigator,
			constraints?: MediaStreamConstraints | undefined,
			onSuccess?: (stream: MediaStream) => void,
			onError?: (error: any) => void,
		) => void;
		/** @deprecated use the newer `navigator.mediaDevices.getUserMedia()` instead */
		webkitGetUserMedia?: (
			this: Navigator,
			constraints?: MediaStreamConstraints | undefined,
			onSuccess?: (stream: MediaStream) => void,
			onError?: (error: any) => void,
		) => void;
		/** @deprecated use the newer `navigator.mediaDevices.getUserMedia()` instead */
		mozGetUserMedia?: (
			this: Navigator,
			constraints?: MediaStreamConstraints | undefined,
			onSuccess?: (stream: MediaStream) => void,
			onError?: (error: any) => void,
		) => void;
		/** @deprecated use the newer `navigator.mediaDevices.getUserMedia()` instead */
		msGetUserMedia?: (
			this: Navigator,
			constraints?: MediaStreamConstraints | undefined,
			onSuccess?: (stream: MediaStream) => void,
			onError?: (error: any) => void,
		) => void;
		userAgentData?: {
			mobile: boolean;
		};
	}

	interface NotificationEventMap {
		reply: { response: string };
		/** Fired by the desktop app when one of a notification's action buttons is pressed. */
		action: { action: string };
	}
}
