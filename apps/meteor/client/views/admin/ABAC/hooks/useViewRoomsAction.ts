import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useRouter } from '@yas chat/ui-contexts';

export const useViewRoomsAction = () => {
	const router = useRouter();
	return useStableCallback((key: string) => {
		return router.navigate(
			{
				name: 'admin-ABAC',
				params: {
					tab: 'rooms',
					context: '',
					id: '',
				},
				search: {
					searchTerm: key,
					type: 'attribute',
				},
			},
			{ replace: true },
		);
	});
};
