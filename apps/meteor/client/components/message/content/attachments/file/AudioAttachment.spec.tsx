import type { AudioPlayerControls } from '@yas chat/fuselage';
import { mockAppRoot } from '@yas chat/mock-providers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';

import AudioAttachment from './AudioAttachment';

const mockPlay = jest.fn();
const mockSeek = jest.fn();

jest.mock('../../../../../providers/MediaPlayerProvider', () => ({
	useMediaPlayer: () => ({
		play: mockPlay,
		toggle: jest.fn(),
		seek: mockSeek,
		cyclePlaybackRate: jest.fn(),
		isActive: () => false,
		playing: false,
		currentTime: 5,
		duration: 60,
		playbackRate: 1,
	}),
}));

jest.mock('@yas chat/ui-contexts', () => ({
	...jest.requireActual('@yas chat/ui-contexts'),
	useMediaUrl: () => (url: string) => url,
}));

jest.mock('@yas chat/fuselage', () => ({
	...jest.requireActual('@yas chat/fuselage'),
	AudioPlayerControls: ({
		currentTime,
		onSeek,
		onTogglePlay,
	}: Pick<ComponentProps<typeof AudioPlayerControls>, 'currentTime' | 'onSeek' | 'onTogglePlay'>) => (
		<div>
			<span data-testid='position'>{currentTime}</span>
			<button onClick={() => onSeek(42)}>seek</button>
			<button onClick={onTogglePlay}>toggle</button>
		</div>
	),
}));

describe('AudioAttachment seeking while inactive', () => {
	it('keeps the position local, without touching the shared player, until play is pressed', async () => {
		render(
			<AudioAttachment audio_url='/file-upload/a.mp3' audio_type='audio/mpeg' audio_size={1} title='a.mp3' source={{ mid: 'mid-b' }} />,
			{
				wrapper: mockAppRoot().build(),
			},
		);

		await userEvent.click(screen.getByText('seek'));

		expect(screen.getByTestId('position')).toHaveTextContent('42');
		expect(mockPlay).not.toHaveBeenCalled();
		expect(mockSeek).not.toHaveBeenCalled();

		await userEvent.click(screen.getByText('toggle'));

		expect(mockPlay).toHaveBeenCalledWith(expect.objectContaining({ id: 'mid-b:/file-upload/a.mp3' }), 42);
	});
});
