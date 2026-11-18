import { Box, Button } from '@yas chat/fuselage';
import type { ButtonHTMLAttributes } from 'react';

const EmojiPickerLoadMore = ({ children, ...props }: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'is'>) => (
	<Box display='flex' flexDirection='column' alignItems='center' marginBlockEnd='x8'>
		<Button {...props} size='small'>
			{children}
		</Button>
	</Box>
);

export default EmojiPickerLoadMore;
