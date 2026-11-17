import { api, ClientSafeError } from '@rocket.chat/core-services';
import type { ICustomEmojiDescriptor } from '@rocket.chat/core-typings';
import { EmojiCustom } from '@rocket.chat/models';

import { hasPermissionAsync } from '../../lib/authorization/hasPermission';
import { YasChatFileEmojiCustomInstance } from '../../lib/media/emoji-custom/startup/emoji-custom';

export const deleteEmojiCustom = async (userId: string, emojiID: ICustomEmojiDescriptor['_id']): Promise<boolean> => {
	if (!(await hasPermissionAsync(userId, 'manage-emoji'))) {
		throw new ClientSafeError('not_authorized');
	}

	const emoji = await EmojiCustom.findOneById(emojiID);
	if (emoji == null) {
		throw new ClientSafeError('Custom_Emoji_Error_Invalid_Emoji', 'Invalid emoji', {
			method: 'deleteEmojiCustom',
		});
	}

	await YasChatFileEmojiCustomInstance.deleteFile(encodeURIComponent(`${emoji.name}.${emoji.extension}`));
	await EmojiCustom.removeById(emojiID);
	void api.broadcast('emoji.deleteCustom', emoji);

	return true;
};
