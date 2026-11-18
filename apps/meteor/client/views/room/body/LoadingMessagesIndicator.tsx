import { Text, Throbber } from '@yas chat/fuselage';

const LoadingMessagesIndicator = () => (
	<Text color='default'>
		<Throbber inheritColor />
	</Text>
);

export default LoadingMessagesIndicator;
