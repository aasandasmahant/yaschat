import { Emitter } from '@yaschat/emitter';

class NotificationPermissionEmitter extends Emitter {
	allowed: boolean;
}
export const notificationManager = new NotificationPermissionEmitter();
