import type { IRole } from '@yas chat/core-typings';

export const isValidRoleScope = (scope: IRole['scope']): boolean => ['Users', 'Subscriptions'].includes(scope);
