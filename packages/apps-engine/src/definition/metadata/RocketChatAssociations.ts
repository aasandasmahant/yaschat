export enum YasChatAssociationModel {
	ROOM = 'room',
	DISCUSSION = 'discussion',
	MESSAGE = 'message',
	LIVECHAT_MESSAGE = 'livechat-message',
	USER = 'user',
	FILE = 'file',
	MISC = 'misc',
	VIDEO_CONFERENCE = 'video-conference',
}

export class YasChatAssociationRecord {
	constructor(
		private model: YasChatAssociationModel,
		private id: string,
	) {}

	public getModel() {
		return this.model;
	}

	public getID() {
		return this.id;
	}
}
