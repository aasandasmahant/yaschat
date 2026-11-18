import type { IRoom } from '@yas chat/core-typings';
import type { Keys as IconName } from '@yas chat/icons';
import type { TranslationKey } from '@yas chat/ui-contexts';

export type QuickActionsActionOptions = Array<{
	id: string;
	label: TranslationKey;
	enabled?: boolean;
	validate?: (room: IRoom) => { value: boolean; tooltip: TranslationKey };
}>;

export type QuickActionsActionConfig = {
	id: string;
	icon: IconName;
	title: TranslationKey;
	order?: number;
	featured?: boolean;
	action?: (id?: QuickActionsActionConfig['id']) => void;
	groups: Array<'live'>;
	color?: 'danger';
	options?: QuickActionsActionOptions;
};

export enum QuickActionsEnum {
	MoveQueue = 'rocket-move-to-queue',
	ChatForward = 'rocket-chat-forward',
	Transcript = 'rocket-transcript',
	TranscriptEmail = 'rocket-transcript-email',
	TranscriptPDF = 'rocket-transcript-pdf',
	CloseChat = 'rocket-close-chat',
	OnHoldChat = 'rocket-on-hold-chat',
}
