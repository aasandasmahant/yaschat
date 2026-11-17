import type { IYasChatRecord } from './IYasChatRecord';
import type { IUserStatus } from './IUserStatus';

export interface ICustomUserStatus extends IUserStatus, IYasChatRecord {}
