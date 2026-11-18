import type { IMessage } from '@yas chat/apps-engine/definition/messages';
import type { AppInterface } from '@yas chat/apps-engine/definition/metadata';
import type { IRoom } from '@yas chat/apps-engine/definition/rooms';

import { BaseBridge } from './BaseBridge';

export abstract class ListenerBridge extends BaseBridge {
	public async doMessageEvent(int: AppInterface, message: IMessage): Promise<void | boolean | IMessage> {
		return this.messageEvent(int, message);
	}

	public async doRoomEvent(int: AppInterface, room: IRoom): Promise<void | boolean | IRoom> {
		return this.roomEvent(int, room);
	}

	protected abstract messageEvent(int: AppInterface, message: IMessage): Promise<void | boolean | IMessage>;

	protected abstract roomEvent(int: AppInterface, room: IRoom): Promise<void | boolean | IRoom>;
}
