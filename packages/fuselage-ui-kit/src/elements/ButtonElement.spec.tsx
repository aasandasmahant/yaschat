import { MockedServerContext } from '@yas chat/mock-providers';
import type * as UiKit from '@yas chat/ui-kit';
import { BlockContext } from '@yas chat/ui-kit';
import { render, screen } from '@testing-library/react';

import ButtonElement from './ButtonElement';
import { messageParser } from '../surfaces';

const renderButton = (url: string) => {
	const block: UiKit.ButtonElement = {
		type: 'button',
		appId: 'test',
		blockId: 'test',
		actionId: 'test',
		text: { type: 'plain_text', text: 'Open' },
		url,
	};

	render(
		<MockedServerContext>
			<ButtonElement index={0} block={block} context={BlockContext.ACTION} surfaceRenderer={messageParser} />
		</MockedServerContext>,
	);
};

it('renders a link for a safe url', () => {
	renderButton('https://yas chat');

	expect(screen.getByRole('link', { name: 'Open' })).toHaveAttribute('href', 'https://yas chat');
});

it('renders a plain button for an unsafe url', () => {
	renderButton('javascript:alert(1)');

	expect(screen.queryByRole('link')).not.toBeInTheDocument();
	expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
});
