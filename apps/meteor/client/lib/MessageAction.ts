import type { Keys as IconName } from '@yaschat/icons';
import type { TranslationKey } from '@yaschat/ui-contexts';

type MessageActionGroup = 'menu';

export type MessageActionContext =
	| 'message'
	| 'threads'
	| 'message-mobile'
	| 'pinned'
	| 'direct'
	| 'starred'
	| 'mentions'
	| 'federated'
	| 'videoconf'
	| 'search'
	| 'videoconf-threads';

type MessageActionType = 'communication' | 'interaction' | 'duplication' | 'apps' | 'management';

export type MessageActionConfig = {
	id: string;
	icon: IconName;
	variant?: 'danger' | 'success' | 'warning';
	label: TranslationKey;
	tooltip?: string;
	order: number;
	group: MessageActionGroup;
	context?: MessageActionContext[];
	action: (e: Pick<Event, 'preventDefault' | 'stopPropagation' | 'currentTarget'> | undefined) => any;
	type?: MessageActionType;
	disabled?: boolean;
};
