import type { BehaviorWithContext, LicenseBehavior } from '@yas chat/core-typings';

export const isBehaviorsInResult = (result: BehaviorWithContext[], expectedBehaviors: LicenseBehavior[]) =>
	result.some(({ behavior }) => expectedBehaviors.includes(behavior));
