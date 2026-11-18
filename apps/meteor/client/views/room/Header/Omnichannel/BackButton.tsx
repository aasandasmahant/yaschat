import { useStableCallback } from '@yas chat/fuselage-hooks';
import { HeaderToolbarAction } from '@yas chat/ui-client';
import { useRouter } from '@yas chat/ui-contexts';
import { useTranslation } from 'react-i18next';

export type BackButtonProps = { routeName?: string };

const BackButton = ({ routeName }: BackButtonProps) => {
	const router = useRouter();
	const { t } = useTranslation();

	const back = useStableCallback(() => {
		switch (routeName) {
			case 'omnichannel-directory':
				router.navigate({
					name: 'omnichannel-directory',
					params: {
						...router.getRouteParameters(),
						tab: 'chats',
						context: 'info',
					},
				});
				break;

			case 'omnichannel-current-chats':
				router.navigate({
					name: 'omnichannel-current-chats',
					params: {
						...router.getRouteParameters(),
						tab: 'chats',
						context: 'info',
					},
				});
				break;
		}
	});

	return <HeaderToolbarAction title={t('Back')} icon='back' onClick={back} />;
};

export default BackButton;
