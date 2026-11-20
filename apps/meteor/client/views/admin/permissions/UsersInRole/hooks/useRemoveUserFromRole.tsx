import type { IRole, IRoom, IUserInRole } from '@yaschat/core-typings';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { GenericModal } from '@yaschat/ui-client';
import { useSetModal, useToastMessageDispatch, useEndpoint } from '@yaschat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useRemoveUserFromRole = ({
	rid,
	roleId,
	roleName,
	roleDescription,
}: {
	rid?: IRoom['_id'];
	roleId: IRole['_id'];
	roleName: IRole['name'];
	roleDescription: IRole['description'];
}) => {
	const { t } = useTranslation();

	const setModal = useSetModal();
	const dispatchToastMessage = useToastMessageDispatch();
	const queryClient = useQueryClient();

	const removeUserFromRoleEndpoint = useEndpoint('POST', '/v1/roles.removeUserFromRole');

	const handleRemove = useStableCallback((username: IUserInRole['username']) => {
		const remove = async () => {
			try {
				if (!username) throw new Error('Username is required');

				await removeUserFromRoleEndpoint({ roleId, username, scope: rid });
				dispatchToastMessage({ type: 'success', message: t('User_removed') });
				queryClient.invalidateQueries({
					queryKey: ['getUsersInRole'],
				});
			} catch (error) {
				dispatchToastMessage({ type: 'error', message: error });
			} finally {
				setModal(null);
			}
		};

		setModal(
			<GenericModal variant='danger' onConfirm={remove} onCancel={() => setModal(null)} confirmText={t('Delete')}>
				{t('The_user_s_will_be_removed_from_role_s', { username, role: roleDescription || roleName })}
			</GenericModal>,
		);
	});

	return handleRemove;
};
