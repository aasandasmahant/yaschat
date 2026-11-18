import { registerModel } from '@yas chat/models';

import { LivechatTagRaw } from './raw/LivechatTag';
import { db } from '../../../server/database/utils';

registerModel('ILivechatTagModel', new LivechatTagRaw(db));
