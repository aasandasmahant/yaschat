import type { IRoom, ISubscription } from '@yaschat/core-typings';

export const useMessageComposerIsArchived = (room: IRoom, subscription?: ISubscription): boolean =>
	!!room?.archived || Boolean(subscription && subscription.t === 'd' && subscription.archived);
