import { AuthorizationUtils } from '@yas chat/authorization/dist/AuthorizationUtils';
import type { IRole } from '@yas chat/core-typings';
import { Box, CheckBox, Throbber } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import { GenericModal, GenericTableCell } from '@yas chat/ui-client';
import { useSetModal } from '@yas chat/ui-contexts';
import { useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { confirmationRequiredPermissions } from '../../../../../lib/authorization';

export type RoleCellProps = {
	_id: IRole['_id'];
	name: IRole['name'];
	description: IRole['description'];
	onChange: (roleId: IRole['_id'], granted: boolean) => Promise<boolean>;
	permissionId: string;
	permissionName: string;
	grantedRoles: IRole['_id'][];
};

const RoleCell = ({ _id, name, description, onChange, permissionId, permissionName, grantedRoles = [] }: RoleCellProps) => {
	const { t } = useTranslation();
	const setModal = useSetModal();
	const [granted, setGranted] = useState(() => !!grantedRoles.includes(_id));
	const [loading, setLoading] = useState(false);

	const isRestrictedForRole = AuthorizationUtils.isPermissionRestrictedForRole(permissionId, _id);
	const shouldDisplayConfirmation = confirmationRequiredPermissions.includes(permissionId) && grantedRoles.length === 1 && granted;

	const handleChange = useStableCallback(() => {
		if (shouldDisplayConfirmation) {
			const handleSubmit = () => {
				handleConfirmChange();
				setModal(null);
			};

			return setModal(
				<GenericModal onConfirm={handleSubmit} onCancel={() => setModal(null)} confirmText={t('Remove')} variant='danger'>
					{t('Last_role_in_permission_warning')}
				</GenericModal>,
			);
		}

		return handleConfirmChange();
	});

	const handleConfirmChange = useStableCallback(async () => {
		setLoading(true);
		const result = await onChange(_id, granted);
		setGranted(result);
		setLoading(false);
	});

	const isDisabled = !!loading || !!isRestrictedForRole;
	const checkboxLabel = `${permissionName} - ${description || name}`;

	return (
		<GenericTableCell truncate>
			<Box display='flex' alignItems='center' gap='x4'>
				<CheckBox aria-label={checkboxLabel} checked={granted} onChange={handleChange} disabled={isDisabled} />
				{!loading && (
					<Box display='inline' color='hint' invisible>
						{description || name}
					</Box>
				)}
				{loading && <Throbber size='x12' />}
			</Box>
		</GenericTableCell>
	);
};

export default memo(RoleCell);
