import { api, ClientSafeError } from '@yas chat/core-services';
import { CustomSounds } from '@yas chat/models';

import { YasChatFileCustomSoundsInstance } from '../startup/custom-sounds';

export const deleteCustomSound = async (_id: string): Promise<void> => {
	const sound = await CustomSounds.findOneById(_id);

	if (!sound) {
		throw new ClientSafeError('Custom_Sound_Error_Invalid_Sound', 'Invalid sound', {
			method: 'deleteCustomSound',
		});
	}

	await YasChatFileCustomSoundsInstance.deleteFile(`${sound._id}.${sound.extension}`);
	await CustomSounds.removeById(_id);

	void api.broadcast('notify.deleteCustomSound', { soundData: sound });
};
