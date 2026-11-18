import type { GenericMenuItemProps } from '@yas chat/ui-client';
import { useToastMessageDispatch } from '@yas chat/ui-contexts';
import type { UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useUiKitActionManager } from './uikit/useUiKitActionManager';
import { useAppActionButtons } from './useAppActionButtons';
import { useApplyButtonAuthFilter } from './useApplyButtonFilters';
import { Utilities } from '../../ee/lib/misc/Utilities';
import { UiKitTriggerTimeoutError } from '../lib/errors/UiKitTriggerTimeoutError';

export const useUserDropdownAppsActionButtons = () => {
	const result = useAppActionButtons('userDropdownAction');
	const actionManager = useUiKitActionManager();
	const dispatchToastMessage = useToastMessageDispatch();
	const { t } = useTranslation();

	const applyButtonFilters = useApplyButtonAuthFilter();

	const data = useMemo(
		() =>
			result.data
				?.filter((action) => applyButtonFilters(action))
				.map((action): GenericMenuItemProps => {
					return {
						id: `${action.appId}_${action.actionId}`,
						// icon: action.icon as GenericMenuItemProps['icon'],
						content: t(Utilities.getI18nKeyForApp(action.labelI18n, action.appId)),
						onClick: () => {
							void actionManager
								.emitInteraction(action.appId, {
									type: 'actionButton',
									actionId: action.actionId,
									payload: { context: action.context },
								})
								.catch(async (reason) => {
									if (reason instanceof UiKitTriggerTimeoutError) {
										dispatchToastMessage({
											type: 'error',
											message: t('UIKit_Interaction_Timeout'),
										});
										return;
									}

									return reason;
								});
						},
					};
				}),
		[actionManager, applyButtonFilters, dispatchToastMessage, result.data, t],
	);
	return {
		...result,
		data,
	} as unknown as UseQueryResult<GenericMenuItemProps[]>;
};
