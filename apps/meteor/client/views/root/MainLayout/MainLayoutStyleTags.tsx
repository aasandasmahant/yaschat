import { PaletteStyleTag } from '@yaschat/fuselage';
import { useThemeMode } from '@yaschat/ui-client';

import { codeBlock } from '../lib/codeBlockStyles';

export const MainLayoutStyleTags = () => {
	const theme = useThemeMode();

	return (
		<>
			<PaletteStyleTag theme={theme} selector='.rcx-content--main, .rcx-tile' tagId={`main-palette-${theme}`} />
			<PaletteStyleTag theme='dark' selector='.rcx-sidebar--main, .rcx-sidebar-rail, .rcx-sidepanel, .rcx-navbar' tagId='sidebar-palette' />
			{theme === 'dark' && <PaletteStyleTag selector='.rcx-content--main' palette={codeBlock} tagId='codeBlock-palette' />}
		</>
	);
};
