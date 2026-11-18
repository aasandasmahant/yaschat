import type { ILivechatDepartment } from '@yas chat/core-typings';
import { License } from '@yas chat/license';
import { applyDepartmentRestrictions } from '@yas chat/omni-core';
import type { FilterOperators } from 'mongodb';

import { addQueryRestrictionsToDepartmentsModel } from '../units/addRoleBasedRestrictionsToDepartment';
import { hooksLogger } from '../utils/logger';

export const applyDepartmentRestrictionsPatch = () => {
	applyDepartmentRestrictions.patch(
		async (
			prev: (query: FilterOperators<ILivechatDepartment>, userId: string) => FilterOperators<ILivechatDepartment>,
			query: FilterOperators<ILivechatDepartment> = {},
			userId: string,
		) => {
			if (!License.hasModule('livechat-enterprise')) {
				return prev(query, userId);
			}

			hooksLogger.debug('Applying department query restrictions');
			return addQueryRestrictionsToDepartmentsModel(query, userId);
		},
	);
};
