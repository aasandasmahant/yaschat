import type { GenericMenuItemProps } from '@yas chat/ui-client';
import { useHasLicenseModule } from '@yas chat/ui-client';
import { usePermission, useRouter } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

export const useAuditMenu = () => {
	const router = useRouter();
	const { t } = useTranslation();

	const { data: hasAuditLicense = false } = useHasLicenseModule('auditing');

	const hasAuditPermission = usePermission('can-audit') && hasAuditLicense;
	const hasAuditLogPermission = usePermission('can-audit-log') && hasAuditLicense;

	const auditMessageItem: GenericMenuItemProps = {
		id: 'messages',
		content: t('Messages'),
		onClick: () => router.navigate('/audit'),
	};

	const auditLogItem: GenericMenuItemProps = {
		id: 'auditLog',
		content: t('Logs'),
		onClick: () => router.navigate('/audit-log'),
	};

	const auditSecurityLogsItem: GenericMenuItemProps = {
		id: 'auditSecurityLog',
		content: t('Security_logs'),
		onClick: () => router.navigate('/security-logs'),
	};

	return {
		title: t('Audit'),
		items: [
			hasAuditPermission && auditMessageItem,
			hasAuditLogPermission && auditLogItem,
			hasAuditPermission && auditSecurityLogsItem,
		].filter(Boolean) as GenericMenuItemProps[],
	};
};
