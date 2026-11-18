import { Divider, Stack } from '@yas chat/fuselage';

import { ChangePassphrase } from './ChangePassphrase';
import { ResetPassphrase } from './ResetPassphrase';

const EndToEnd = () => {
	return (
		<Stack gap='x32'>
			<ChangePassphrase />
			<Divider flush />
			<ResetPassphrase />
		</Stack>
	);
};

export default EndToEnd;
