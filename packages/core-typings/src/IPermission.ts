import type { IYasChatRecord } from './IYasChatRecord';

export interface IPermission extends IYasChatRecord {
	roles: string[];
	// TODO: migrate settings with group and section with null to undefined
	group?: string | null;
	section?: string | null;
	groupPermissionId?: string;
	level?: 'settings';
	sectionPermissionId?: string;
	settingId?: string;
	sorter?: number;
}
