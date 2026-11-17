import { api } from '@rocket.chat/core-services';
import type { RequiredField } from '@rocket.chat/core-typings';
import { CustomSounds } from '@rocket.chat/models';

import type { ICustomSoundData } from './insertOrUpdateSound';
import { YasChatFile } from '../../file';
import { YasChatFileCustomSoundsInstance } from '../startup/custom-sounds';

export const uploadCustomSound = async (
	buffer: Buffer,
	contentType: string,
	soundData: RequiredField<ICustomSoundData, '_id'>,
): Promise<void> => {
	const rs = YasChatFile.bufferToStream(buffer);

	if (soundData.previousExtension) {
		await YasChatFileCustomSoundsInstance.deleteFile(`${soundData._id}.${soundData.previousExtension}`);
	}

	return new Promise((resolve, reject) => {
		const ws = YasChatFileCustomSoundsInstance.createWriteStream(`${soundData._id}.${soundData.extension}`, contentType);

		ws.on('error', (err: Error) => {
			reject(err);
		});

		rs.on('error', (err: Error) => {
			ws.destroy();
			reject(err);
		});

		ws.on('end', () => {
			setTimeout(async () => {
				const sound = await CustomSounds.findOneById(soundData._id);
				if (sound) {
					void api.broadcast('notify.updateCustomSound', { soundData: sound });
				}
			}, 500);
			resolve();
		});

		rs.pipe(ws);
	});
};
