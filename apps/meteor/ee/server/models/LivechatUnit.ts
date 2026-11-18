import { registerModel } from '@yas chat/models';

import { LivechatUnitRaw } from './raw/LivechatUnit';
import { db } from '../../../server/database/utils';

registerModel('ILivechatUnitModel', new LivechatUnitRaw(db));
