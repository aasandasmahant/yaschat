import { ClientSafeError } from '@yas chat/core-services';
import type { IUser } from '@yas chat/core-typings';
import { Imports } from '@yas chat/models';
import { type StartImportParamsPOST } from '@yas chat/rest-typings';

import { Importers } from '../../lib/import';

export const executeStartImport = async ({ input }: StartImportParamsPOST, startedByUserId: IUser['_id']) => {
	const operation = await Imports.findLastImport();
	if (!operation) {
		throw new ClientSafeError('error-operation-not-found', 'Import Operation Not Found', 'startImport');
	}

	const { importerKey } = operation;
	const importer = Importers.get(importerKey);
	if (!importer) {
		throw new ClientSafeError('error-importer-not-defined', `The importer (${importerKey}) has no import class defined.`, 'startImport');
	}

	const instance = new importer.importer(importer, operation); // oxlint-disable-line new-cap

	await instance.startImport(input, startedByUserId);
};
