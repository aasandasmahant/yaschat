import type { IRole } from '@yaschat/core-typings';
import { Callout } from '@yaschat/fuselage';
import { GenericError, PageSkeleton, useHasLicenseModule } from '@yaschat/ui-client';
import { useRouteParameter } from '@yaschat/ui-contexts';
import { useTranslation } from 'react-i18next';

import EditRolePage from './EditRolePage';
import { useRole } from './hooks/useRole';

export type EditRolePageWithDataProps = { roleId?: IRole['_id'] };

const EditRolePageWithData = ({ roleId }: EditRolePageWithDataProps) => {
	const { t } = useTranslation();
	const role = useRole(roleId);
	const context = useRouteParameter('context');
	const { isPending, isError, data: hasLicense } = useHasLicenseModule('custom-roles');

	if (!role && context === 'edit') {
		return <Callout type='danger'>{t('error-invalid-role')}</Callout>;
	}

	if (isPending) {
		return <PageSkeleton />;
	}

	if (isError) {
		return <GenericError />;
	}

	return <EditRolePage key={roleId} role={role} isEnterprise={hasLicense} />;
};

export default EditRolePageWithData;
