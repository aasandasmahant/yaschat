import type { LivechatPriorityWeight } from '@yaschat/core-typings';
import { Icon, Tag } from '@yaschat/fuselage';

import { useOmnichannelPrioritiesConfig } from '../../../../omnichannel/hooks/useOmnichannelPrioritiesConfig';

export type SidePanelPriorityTagProps = { priorityWeight: LivechatPriorityWeight };

const SidePanelPriorityTag = ({ priorityWeight }: SidePanelPriorityTagProps) => {
	const prioritiesConfig = useOmnichannelPrioritiesConfig(priorityWeight, false);

	if (!prioritiesConfig?.iconName) {
		return null;
	}

	return (
		<Tag icon={<Icon size='x12' name={prioritiesConfig?.iconName} />} variant={prioritiesConfig?.variant}>
			{prioritiesConfig?.name}
		</Tag>
	);
};

export default SidePanelPriorityTag;
