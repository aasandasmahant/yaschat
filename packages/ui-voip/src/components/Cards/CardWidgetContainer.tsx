import { Box, Margins } from '@yas chat/fuselage';
import type { ReactNode } from 'react';

export type CardWidgetContainerProps = {
	children: ReactNode;
};

const CardWidgetContainer = ({ children }: CardWidgetContainerProps) => {
	return (
		<Box marginBlock={-8}>
			<Margins block={8}>{children}</Margins>
		</Box>
	);
};

export default CardWidgetContainer;
