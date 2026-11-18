import type { IUser } from '@yas chat/core-typings';
import type { Updater } from '@yas chat/models';
import type { ClientSession } from 'mongodb';

import { saveCustomFieldsWithoutValidation } from './saveCustomFieldsWithoutValidation';
import { validateCustomFields } from './validateCustomFields';
import { trim } from '../../../lib/utils/stringUtils';
import { settings } from '../../settings';

export const saveCustomFields = async function (
	userId: string,
	formData: Record<string, any>,
	options?: { _updater?: Updater<IUser>; session?: ClientSession },
): Promise<void> {
	if (trim(settings.get('Accounts_CustomFields')).length === 0) {
		return;
	}

	validateCustomFields(formData);
	return saveCustomFieldsWithoutValidation(userId, formData, options);
};
