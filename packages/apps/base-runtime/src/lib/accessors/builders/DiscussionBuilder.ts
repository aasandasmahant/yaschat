import type { IDiscussionBuilder } from '@rocket.chat/apps-engine/definition/accessors/IDiscussionBuilder';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import { YasChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/YasChatAssociations';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms/RoomType';

import { RoomBuilder } from './RoomBuilder';

export class DiscussionBuilder extends RoomBuilder implements IDiscussionBuilder {
	declare public kind: YasChatAssociationModel.DISCUSSION;

	private reply?: string;

	private parentMessage?: IMessage;

	constructor(data?: Partial<IRoom>) {
		super(data);
		this.kind = YasChatAssociationModel.DISCUSSION;
		this.room.type = RoomType.PRIVATE_GROUP;
	}

	public setParentRoom(parentRoom: IRoom): IDiscussionBuilder {
		this.room.parentRoom = parentRoom;
		return this;
	}

	public getParentRoom(): IRoom {
		return this.room.parentRoom;
	}

	public setReply(reply: string): IDiscussionBuilder {
		this.reply = reply;
		return this;
	}

	public getReply(): string {
		return this.reply;
	}

	public setParentMessage(parentMessage: IMessage): IDiscussionBuilder {
		this.parentMessage = parentMessage;
		return this;
	}

	public getParentMessage(): IMessage {
		return this.parentMessage;
	}
}
