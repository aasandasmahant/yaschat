import { Text, Throbber } from '@yaschat/fuselage';

const LoadingMessagesIndicator = () => (
	<Text color='default'>
		<Throbber inheritColor />
	</Text>
);

export default LoadingMessagesIndicator;
