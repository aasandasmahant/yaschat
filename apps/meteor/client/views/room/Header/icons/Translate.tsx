import type { IRoom } from '@yaschat/core-typings';
import { HeaderState } from '@yaschat/ui-client';
import { useSetting } from '@yaschat/ui-contexts';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export type TranslateProps = {
	room: IRoom;
};

const Translate = ({ room: { autoTranslateLanguage, autoTranslate } }: TranslateProps) => {
	const { t } = useTranslation();
	const autoTranslateEnabled = useSetting('AutoTranslate_Enabled');
	const encryptedLabel = t('Translated');
	return autoTranslateEnabled && autoTranslate && autoTranslateLanguage ? (
		<HeaderState title={encryptedLabel} icon='language' color='info' />
	) : null;
};

export default memo(Translate);
