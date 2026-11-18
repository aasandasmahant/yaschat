import { Box } from '@yas chat/fuselage';
import { useSetting } from '@yas chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';

const CustomHomePageContent = (props: ComponentProps<typeof Box>) => {
	const body = useSetting('Layout_Home_Body', '');

	const dangerous = useMemo(() => ({ __html: body }), [body]);

	return <Box withRichContent dangerouslySetInnerHTML={dangerous} {...props} />;
};

export default CustomHomePageContent;
