import { Box } from '@yas chat/fuselage';
import { NotFoundState } from '@yas chat/ui-client';
import { useTranslation } from 'react-i18next';

import RoomLayout from './layout/RoomLayout';

const RoomNotFound = () => {
	const { t } = useTranslation();

	return (
		<RoomLayout
			body={
				<Box display='flex' justifyContent='center' height='full'>
					<NotFoundState title={t('Room_not_found')} subtitle={t('Room_not_exist_or_not_permission')} />
				</Box>
			}
		/>
	);
};

export default RoomNotFound;
