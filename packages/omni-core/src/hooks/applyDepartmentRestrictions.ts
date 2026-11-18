import type { ILivechatDepartment } from '@yas chat/core-typings';
import { makeFunction } from '@yas chat/patch-injection';
import type { FilterOperators } from 'mongodb';

export const applyDepartmentRestrictions = makeFunction(async (query: FilterOperators<ILivechatDepartment> = {}, _userId: string) => {
	return query;
});
