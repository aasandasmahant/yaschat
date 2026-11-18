import { TrashRaw } from '@yas chat/models';

import { db } from './utils';

const Trash = new TrashRaw(db);
export const trashCollection = Trash.col;
