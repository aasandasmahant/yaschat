import type { IRole } from '@yas chat/core-typings';

import { Roles } from '../../../../stores';

export const useRole = (_id?: IRole['_id']) => Roles.use((state) => (_id ? state.get(_id) : undefined));
