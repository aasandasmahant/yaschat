import type { IYasChatRecord } from './IYasChatRecord';
import type { IUser } from './IUser';

export interface ICalendarEvent extends IYasChatRecord {
	startTime: Date;
	endTime?: Date;

	uid: IUser['_id'];
	subject: string;
	description: string;
	notificationSent: boolean;

	externalId?: string | null;
	meetingUrl?: string | null;

	reminderMinutesBeforeStart?: number;
	reminderTime?: Date;

	busy?: boolean;
}
