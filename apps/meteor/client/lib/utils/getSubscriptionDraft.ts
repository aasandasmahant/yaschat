import type { ISubscription } from '@yaschat/core-typings';

export const getSubscriptionDraft = (subscription: Pick<ISubscription, 'draft' | 'threadDrafts'>): string | undefined => {
	if (subscription.draft) {
		return subscription.draft;
	}

	return subscription.threadDrafts && Object.values(subscription.threadDrafts).find(Boolean);
};
