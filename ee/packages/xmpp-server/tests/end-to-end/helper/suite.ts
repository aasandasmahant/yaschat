import { Cleanup } from './cleanup';
import { config } from './config';
import { connectYasChat, forgetRemoteUserOnCleanup } from './yaschat';
import type { YasChat } from './yaschat';
import { XmppUser } from './xmpp-client';

/** Connects to YasChat and returns the suite's context; pass it to `teardown` when done. */
export async function setupSuite(): Promise<YasChat> {
	await assertServiceForwards();
	return connectYasChat(new Cleanup());
}

async function assertServiceForwards(): Promise<void> {
	const stats = await serviceStats();
	if (stats?.decodeOnly) {
		throw new Error(`xmpp-server-service at ${config.serviceUrl} runs with XMPP_DECODE_ONLY=true; restart it without that variable`);
	}
}

export type ServiceStats = { decodeOnly: boolean; decoded: Record<string, number>; completed: Record<string, number> };

/** The service's `/stats`, or undefined when XMPP_E2E_SERVICE_URL does not answer. */
export async function serviceStats(): Promise<ServiceStats | undefined> {
	try {
		const res = await fetch(`${config.serviceUrl}/stats`, { signal: AbortSignal.timeout(2000) });
		return res.ok ? ((await res.json()) as ServiceStats) : undefined;
	} catch {
		return undefined;
	}
}

/**
 * Registers an account on the XMPP server and, on cleanup, also deletes the local record
 * YasChat materializes for it once it federates.
 */
export async function registerXmppUser(rc: YasChat, label: string): Promise<XmppUser> {
	const user = await XmppUser.register(label, rc.cleanup);
	forgetRemoteUserOnCleanup(rc, user.bareJid);
	return user;
}

/** A ping answered by YasChat proves S2S works in both directions between the two servers. */
export async function assertFederationReachable(rc: YasChat, user: XmppUser): Promise<void> {
	try {
		await user.ping(rc.domain);
	} catch (error) {
		throw new Error(
			`${config.xmpp.domain} cannot reach YasChat's XMPP domain ${rc.domain} over S2S. Check that xmpp-server-service is running, ` +
				`that both servers resolve each other's domain and MUC subdomain (DNS or XMPP_DNS_OVERRIDES), and that dialback is enabled.`,
			{ cause: error },
		);
	}
}
