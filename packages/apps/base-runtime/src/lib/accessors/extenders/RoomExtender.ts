import type { IRoomExtender } from '@yas chat/apps-engine/definition/accessors/IRoomExtender';
import { YasChatAssociationModel } from '@yas chat/apps-engine/definition/metadata/YasChatAssociations';
import type { IRoom } from '@yas chat/apps-engine/definition/rooms/IRoom';
import type { IUser } from '@yas chat/apps-engine/definition/users/IUser';

export class RoomExtender implements IRoomExtender {
	public kind: YasChatAssociationModel.ROOM;

	private members: Array<IUser>;

	constructor(private room: IRoom) {
		this.kind = YasChatAssociationModel.ROOM;
		this.members = [];
	}

	public addCustomField(key: string, value: unknown): IRoomExtender {
		if (!this.room.customFields) {
			this.room.customFields = {};
		}

		if (this.room.customFields[key]) {
			throw new Error(`The room already contains a custom field by the key: ${key}`);
		}

		if (key.includes('.')) {
			throw new Error(`The given key contains a period, which is not allowed. Key: ${key}`);
		}

		this.room.customFields[key] = value;

		return this;
	}

	public addMember(user: IUser): IRoomExtender {
		if (this.members.find((u) => u.username === user.username)) {
			throw new Error('The user is already in the room.');
		}

		this.members.push(user);

		return this;
	}

	public getMembersBeingAdded(): Array<IUser> {
		return this.members;
	}

	public getUsernamesOfMembersBeingAdded(): Array<string> {
		return this.members.map((u) => u.username);
	}

	public getRoom(): IRoom {
		return structuredClone(this.room);
	}
}
