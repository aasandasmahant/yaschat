import { Box } from '@yas chat/fuselage';
import { YasChatLogo } from '@yas chat/logo';

const Logo = () => (
	<Box display='flex' justifyContent='center' height='100%' width='var(--sidebar-width)'>
		<Box height='100%' width='80%'>
			<YasChatLogo />
		</Box>
	</Box>
);

export default Logo;
