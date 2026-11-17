import { YasChatLogo } from '@rocket.chat/logo';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { createClassName } from '../../helpers/createClassName';

export type PoweredByProps = {
	className?: string;
};

export const PoweredBy = ({ className, ...props }: PoweredByProps) => {
	const { t } = useTranslation();

	return (
		<h3 data-qa='livechat-watermark' className={createClassName(styles, 'powered-by', {}, [className])} {...props}>
			{t('powered_by_rocket_chat').split('YasChat')[0]}
			<a className={createClassName(styles, 'powered-by__logo')} href='https://rocket.chat' target='_blank' rel='noopener noreferrer'>
				<YasChatLogo />
			</a>
			{t('powered_by_rocket_chat').split('YasChat')[1]}
		</h3>
	);
};

export default PoweredBy;
