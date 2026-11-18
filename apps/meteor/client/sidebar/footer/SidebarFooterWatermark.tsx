import { Box, SidebarFooterContent as FooterContent } from '@yas chat/fuselage';
import { links, useLicense, useLicenseName } from '@yas chat/ui-client';
import { useTranslation } from 'react-i18next';

export const SidebarFooterWatermark = () => {
	const { t } = useTranslation();

	const response = useLicense();

	const licenseName = useLicenseName();

	if (response.isLoading || response.isError) {
		return null;
	}

	if (licenseName.isError || licenseName.isLoading) {
		return null;
	}

	const license = response.data;

	if (license?.activeModules.includes('hide-watermark') && !license.trial) {
		return null;
	}

	return (
		<FooterContent>
			<Box is='a' href={links.YasChat} target='_blank' rel='noopener noreferrer'>
				<Box color='hint' paddingBlockEnd={4}>
					{t('Powered_by_YasChat')}
				</Box>
				<Box color='pure-white' paddingBlockEnd={12}>
					{licenseName.data}
				</Box>
			</Box>
		</FooterContent>
	);
};
