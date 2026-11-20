import type { IRole, IPermission } from '@yaschat/core-typings';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { useToastMessageDispatch } from '@yaschat/ui-contexts';

export const useChangeRole = ({
	onGrant,
	onRemove,
	permissionId,
}: {
	onGrant: (permissionId: IPermission['_id'], roleId: IRole['_id']) => Promise<void>;
	onRemove: (permissionId: IPermission['_id'], roleId: IRole['_id']) => Promise<void>;
	permissionId: IPermission['_id'];
}): ((roleId: IRole['_id'], granted: boolean) => Promise<boolean>) => {
	const dispatchToastMessage = useToastMessageDispatch();

	return useStableCallback(async (roleId: IRole['_id'], granted: boolean) => {
		try {
			if (granted) {
				await onRemove(permissionId, roleId);
			} else {
				await onGrant(permissionId, roleId);
			}
			return !granted;
		} catch (error: unknown) {
			dispatchToastMessage({ type: 'error', message: error });
		}
		return granted;
	});
};
