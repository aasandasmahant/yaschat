import type { IRole } from '@yas chat/core-typings';
import { Callout } from '@yas chat/fuselage';
import { GenericError, PageSkeleton, useHasLicenseModule } from '@yas chat/ui-client';
import { useRouteParameter } from '@yas chat/ui-contexts';
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
