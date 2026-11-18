import { ConnectionLifecycle, ConnectionRegistry } from '@yas chat/ddp-server';

export const lifecycle = new ConnectionLifecycle();

/** The websocket sessions this process serves. */
export const sessions = new ConnectionRegistry(lifecycle);
