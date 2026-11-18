import type { ISetting } from '@yas chat/core-typings';
import { css } from '@yas chat/css-in-js';
import { Button, Box, Card, CardTitle, CardBody, CardControls } from '@yas chat/fuselage';
import type { TranslationKey } from '@yas chat/ui-contexts';
import { useRouter } from '@yas chat/ui-contexts';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import MarkdownText from '../../../components/MarkdownText';

const clampStyle = css`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 5;
	-webkit-box-orient: vertical;
`;

export type SettingsGroupCardProps = {
	id: ISetting['_id'];
	title: TranslationKey;
	description?: TranslationKey;
};

const SettingsGroupCard = ({ id, title, description, ...props }: SettingsGroupCardProps) => {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const cardId = useId();
	const descriptionId = useId();

	return (
		<Card data-qa-id={id} aria-labelledby={cardId} aria-describedby={descriptionId} {...props} role='region'>
			<CardTitle id={cardId}>{t(title)}</CardTitle>
			<CardBody>
				<Box className={clampStyle} id={descriptionId}>
					{description && i18n.exists(description as string) && <MarkdownText variant='inlineWithoutBreaks' content={t(description)} />}
				</Box>
			</CardBody>
			<CardControls>
				<Button
					is='a'
					href={router.buildRoutePath({
						pattern: '/admin/settings/:group?',
						params: { group: id },
					})}
					size='medium'
				>
					{t('Open')}
				</Button>
			</CardControls>
		</Card>
	);
};

export default SettingsGroupCard;
