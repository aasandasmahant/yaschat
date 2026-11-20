import type { IRole } from '@yaschat/core-typings';
import { Box, Button } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import { GenericTableHeaderCell } from '@yaschat/ui-client';
import { useRoute } from '@yaschat/ui-contexts';
import { memo } from 'react';

export type RoleHeaderProps = {
	_id: IRole['_id'];
	name: IRole['name'];
	description: IRole['description'];
};

const RoleHeader = ({ _id, name, description }: RoleHeaderProps) => {
	const router = useRoute('admin-permissions');

	const handleEditRole = useStableCallback(() => {
		router.push({
			context: 'edit',
			_id,
		});
	});

	return (
		<GenericTableHeaderCell>
			<Box marginInline='neg-x4'>
				<Button size='small' icon='edit' variant='secondary' onClick={handleEditRole}>
					{description || name}
				</Button>
			</Box>
		</GenericTableHeaderCell>
	);
};

export default memo(RoleHeader);
