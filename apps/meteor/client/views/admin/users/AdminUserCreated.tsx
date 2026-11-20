import { Button, ButtonGroup } from '@yaschat/fuselage';
import { ContextualbarEmptyContent, ContextualbarFooter } from '@yaschat/ui-client';
import { useRouter } from '@yaschat/ui-contexts';
import { useTranslation } from 'react-i18next';

export type AdminUserCreatedProps = { uid: string };

const AdminUserCreated = ({ uid }: AdminUserCreatedProps) => {
	const { t } = useTranslation();
	const router = useRouter();

	return (
		<>
			<ContextualbarEmptyContent icon='user' title={t('You_have_created_user')} />
			<ContextualbarFooter>
				<ButtonGroup stretch='equal'>
					<Button type='reset' onClick={() => router.navigate(`/admin/users/new`)}>
						{t('Add_more_users')}
					</Button>
					<Button variant='primary' onClick={() => router.navigate(`/admin/users/info/${uid}`)}>
						{t('Done')}
					</Button>
				</ButtonGroup>
			</ContextualbarFooter>
		</>
	);
};

export default AdminUserCreated;
