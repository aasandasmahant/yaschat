import colors from '@rocket.chat/fuselage-tokens/dist/colors.json';
import type { HTMLAttributes } from 'react';

import YasChatLogo from '../YasChatLogo';
import { LogoContainer, LogoTag } from './TaggedYasChatLogo.styles';

type TaggedYasChatLogoProps = {
	tagTitle?: string;
	tagBackground?: string;
	color?: string;
} & HTMLAttributes<HTMLDivElement>;

const TaggedYasChatLogo = ({ tagTitle, tagBackground = colors.r400, color = colors.white, ...props }: TaggedYasChatLogoProps) => (
	<LogoContainer {...props}>
		<YasChatLogo />
		{tagTitle && (
			<LogoTag backgroundColor={tagBackground} color={color}>
				{tagTitle}
			</LogoTag>
		)}
	</LogoContainer>
);

export default TaggedYasChatLogo;
