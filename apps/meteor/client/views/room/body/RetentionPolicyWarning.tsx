import type { IRoom } from '@yas chat/core-typings';
import { Box, Bubble } from '@yas chat/fuselage';
import { useTranslation } from 'react-i18next';

import { withErrorBoundary } from '../../../components/withErrorBoundary';
import { usePruneWarningMessage } from '../../../hooks/usePruneWarningMessage';

export type RetentionPolicyWarningProps = { room: IRoom };

const RetentionPolicyWarning = ({ room }: RetentionPolicyWarningProps) => {
	const { t } = useTranslation();

	const message = usePruneWarningMessage(room);

	return (
		<Box display='flex' justifyContent='center' paddingInline={20} marginBlock={8}>
			<Bubble role='alert' aria-live='polite' aria-label={t('Retention_policy_warning_banner')} small secondary>
				{message}
			</Bubble>
		</Box>
	);
};

export default withErrorBoundary(RetentionPolicyWarning);
