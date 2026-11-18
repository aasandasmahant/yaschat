import { css } from '@yas chat/css-in-js';
import type { Box } from '@yas chat/fuselage';
import { Palette } from '@yas chat/fuselage';
import type { ComponentPropsWithoutRef, ComponentType, KeyboardEvent } from 'react';

const activateWithKeyboard = (event: KeyboardEvent<HTMLElement>) => {
	if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) {
		return;
	}

	event.preventDefault();
	event.currentTarget.click();
};

// TODO remove border from here
export function clickableItem<TProps extends Pick<ComponentPropsWithoutRef<typeof Box>, 'className' | 'tabIndex' | 'onKeyDown'>>(
	Component: ComponentType<TProps>,
) {
	const clickable = css`
		cursor: pointer;
		&:hover,
		&:focus {
			background: ${Palette.surface['surface-hover']};
		}
		border-bottom: 1px solid ${Palette.stroke['stroke-extra-light']} !important;
	`;
	const WrappedComponent = (props: TProps) => <Component className={clickable} tabIndex={0} onKeyDown={activateWithKeyboard} {...props} />;

	WrappedComponent.displayName = `clickableItem(${Component.displayName ?? Component.name ?? 'Component'})`;

	return WrappedComponent;
}
