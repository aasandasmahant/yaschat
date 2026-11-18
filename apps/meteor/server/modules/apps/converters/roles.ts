import type { IAppRolesConverter } from '@yas chat/apps';
import type { IRole as AppsEngineRole } from '@yas chat/apps-engine/definition/roles';
import type { IRole } from '@yas chat/core-typings';
import { Roles } from '@yas chat/models';
import * as z from 'zod';

import { RoleCodec } from './codecs';

export class AppRolesConverter implements IAppRolesConverter {
	async convertById(roleId: string): Promise<AppsEngineRole | undefined> {
		const role = await Roles.findOneById(roleId);

		if (!role) {
			return;
		}
		return this.convertRole(role);
	}

	async convertRole(role: IRole): Promise<AppsEngineRole> {
		return z.decode(RoleCodec, role) as unknown as AppsEngineRole;
	}
}
