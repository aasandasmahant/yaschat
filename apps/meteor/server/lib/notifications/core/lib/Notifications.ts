import { createStreamAdapter } from '@yas chat/ddp-server';
import { InstanceStatus } from '@yas chat/instance-status';
import { NotificationsModule } from '@yas chat/streamer';

import { ddpServer } from '../../../realtime/ddpServer';

const notifications = new NotificationsModule(createStreamAdapter(ddpServer), InstanceStatus.id());

notifications.configure();

export default notifications;
