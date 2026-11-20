import { Button, Box, Field, FieldLabel, FieldRow, Stack } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { UserAutoComplete } from '@yaschat/ui-client';
import { useToastMessageDispatch } from '@yaschat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEndpointMutation } from '../../../hooks/useEndpointMutation';
import { omnichannelQueryKeys } from '../../../lib/queryKeys';

const AddManager = () => {
	const { t } = useTranslation();
	const [username, setUsername] = useState('');
	const dispatchToastMessage = useToastMessageDispatch();

	const usernameFieldId = useId();

	const queryClient = useQueryClient();

	const { mutateAsync: saveAction } = useEndpointMutation('POST', '/v1/livechat/users/manager', {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: omnichannelQueryKeys.managers() });
			setUsername('');
			dispatchToastMessage({ type: 'success', message: t('Manager_added') });
		},
	});

	const handleSave = useStableCallback(async () => {
		await saveAction({ username });
	});

	const handleChange = (value: unknown): void => {
		if (typeof value === 'string') {
			setUsername(value);
		}
	};

	return (
		<Box display='flex' alignItems='center'>
			<Field>
				<FieldLabel htmlFor={usernameFieldId}>{t('Username')}</FieldLabel>
				<FieldRow>
					<Stack direction='row' align='center' justify='space-between' grow gap={8}>
						<UserAutoComplete id={usernameFieldId} value={username} onChange={handleChange} />
						<Button disabled={!username} onClick={handleSave} variant='primary'>
							{t('Add_manager')}
						</Button>
					</Stack>
				</FieldRow>
			</Field>
		</Box>
	);
};

export default AddManager;
