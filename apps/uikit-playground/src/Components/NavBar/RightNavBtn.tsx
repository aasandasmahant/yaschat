import { Box, Button } from '@yas chat/fuselage';
import { useContext } from 'react';

import BurgerIcon from './BurgerIcon';
import { context, navMenuToggleAction } from '../../Context';

const RightNavBtn = () => {
	const { state, dispatch } = useContext(context);

	return (
		<Box marginInlineEnd='x16' onClick={() => state.isMobile && dispatch(navMenuToggleAction(true))}>
			{state.isMobile ? <BurgerIcon /> : <Button variant='primary'>Send to YasChat</Button>}
		</Box>
	);
};

export default RightNavBtn;
