import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';

import type { IUser } from '@yas chat/core-typings';
import { Users } from '@yas chat/models';
import { Random } from '@yas chat/random';

import { FileUpload } from '../media/file-upload';

export const uploadZipFile = async (filePath: string, userId: IUser['_id'], exportType: 'json' | 'html'): Promise<any> => {
	const contentType = 'application/zip';
	const { size } = await stat(filePath);

	const user = await Users.findOneById(userId);
	let userDisplayName = userId;
	if (user) {
		userDisplayName = user.name || user.username || userId;
	}

	const utcDate = new Date().toISOString().split('T')[0];
	const fileSuffix = exportType === 'json' ? '-data' : '';
	const fileId = Random.id();

	const newFileName = encodeURIComponent(`${utcDate}-${userDisplayName}${fileSuffix}-${fileId}.zip`);

	const details = {
		_id: fileId,
		userId,
		type: contentType,
		size,
		name: newFileName,
	};

	const stream = createReadStream(filePath);

	const userDataStore = FileUpload.getStore('UserDataFiles');

	const file = await userDataStore.insert(details, stream);

	return file;
};
