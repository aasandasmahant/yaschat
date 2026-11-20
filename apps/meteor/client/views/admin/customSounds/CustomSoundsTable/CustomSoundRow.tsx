import type { ICustomSound } from '@yaschat/core-typings';
import { IconButton, Text } from '@yaschat/fuselage';
import { GenericTableCell, GenericTableRow } from '@yaschat/ui-client';
import { useCustomSound } from '@yaschat/ui-contexts';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type CustomSoundRowProps = {
	onClick: (soundId: ICustomSound['_id']) => () => void;
	sound: {
		name: string;
		_id: string;
	};
};

const CustomSoundRow = ({ onClick, sound }: CustomSoundRowProps) => {
	const { t } = useTranslation();
	const [isPlay, setPlayAudio] = useState(false);
	const customSound = useCustomSound();

	const handleToggle = useCallback(
		(sound: ICustomSound['_id']) => {
			setPlayAudio(!isPlay);
			if (!isPlay) {
				return customSound.play(sound);
			}

			return customSound.pause(sound);
		},
		[customSound, isPlay],
	);

	return (
		<GenericTableRow
			key={sound._id}
			onKeyDown={onClick(sound._id)}
			onClick={onClick(sound._id)}
			tabIndex={0}
			role='link'
			action
			qa-emoji-id={sound._id}
		>
			<GenericTableCell>
				<Text truncate>{sound.name}</Text>
			</GenericTableCell>
			<GenericTableCell>
				<IconButton
					icon={!isPlay ? 'play' : 'pause'}
					size='small'
					aria-label={!isPlay ? t('Play') : t('Pause')}
					onClick={(e): void => {
						e.preventDefault();
						e.stopPropagation();
						handleToggle(sound._id);
					}}
				/>
			</GenericTableCell>
		</GenericTableRow>
	);
};

export default CustomSoundRow;
