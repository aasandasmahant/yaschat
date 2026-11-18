import type { ClientMediaSignal, ServerMediaSignal } from '@yas chat/media-signaling';

export function stripSensitiveDataFromSdp<T extends RTCSessionDescriptionInit | null>(sdp: T): T {
	if (!sdp?.sdp) {
		return sdp;
	}

	const { ...data } = sdp;

	return {
		...data,
		sdp: `length=${sdp.sdp.length}`,
	};
}

export function stripSensitiveDataFromSignal<T extends ClientMediaSignal | ServerMediaSignal>(signal: T): Partial<T> {
	const { ...data } = signal;

	if ('sdp' in data) {
		data.sdp = stripSensitiveDataFromSdp(data.sdp);
	}

	if ('iceServers' in data) {
		data.iceServers = data.iceServers?.map(({ credential: _credential, ...server }) => server);
	}

	return data;
}
