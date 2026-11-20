import { Box } from '@yaschat/fuselage';
import { ExternalLink } from '@yaschat/ui-client';
import { Trans } from 'react-i18next';

const NewBot = () => (
	<Box paddingBlock={20} fontScale='h4' key='bots'>
		<Trans
			i18nKey='additional_integrations_Bots'
			components={{ a: <ExternalLink to='https://github.com/YasChat/hubot-yaschat' /> }}
		/>
	</Box>
);

export default NewBot;
