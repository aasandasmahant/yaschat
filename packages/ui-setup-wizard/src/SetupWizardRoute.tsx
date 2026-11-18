import { useBreakpoints } from '@yas chat/fuselage-hooks';
import { DarkModeProvider } from '@yas chat/layout';
import { ModalRegion } from '@yas chat/ui-client';

import SetupWizardPage from './SetupWizardPage';
import { useBodyPosition } from './hooks/useBodyPosition';
import { useRouteLock } from './hooks/useRouteLock';
import SetupWizardProvider from './providers/SetupWizardProvider';

export const SetupWizardRoute = () => {
	const locked = useRouteLock();
	const breakpoints = useBreakpoints();
	const isMobile = !breakpoints.includes('md');
	useBodyPosition('relative', isMobile);

	if (locked) {
		return null;
	}

	return (
		<SetupWizardProvider>
			<DarkModeProvider.default>
				<SetupWizardPage />
				<ModalRegion />
			</DarkModeProvider.default>
		</SetupWizardProvider>
	);
};

export default SetupWizardRoute;
