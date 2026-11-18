import { Icon } from '@yas chat/fuselage';
import { TooltipWrapper } from '@yas chat/layout';

type InformationTooltipTriggerProps = {
	text: string;
};

const InformationTooltipTrigger = ({ text }: InformationTooltipTriggerProps) => (
	<TooltipWrapper text={text}>
		<Icon name='info' />
	</TooltipWrapper>
);

export default InformationTooltipTrigger;
