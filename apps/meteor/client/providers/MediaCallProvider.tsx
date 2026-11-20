import { useHasLicenseModule } from '@yaschat/ui-client';
import { usePermission } from '@yaschat/ui-contexts';
import { MediaCallProvider as MediaCallProviderBase } from '@yaschat/ui-voip';
import type { ReactNode } from 'react';

export type MediaCallProviderProps = { children: ReactNode };

const MediaCallProvider = ({ children }: MediaCallProviderProps) => {
	const canMakeInternalCall = usePermission('allow-internal-voice-calls');
	const canMakeExternalCall = usePermission('allow-external-voice-calls');

	const { data: hasModule = false } = useHasLicenseModule('teams-voip');

	const enabled = hasModule && (canMakeInternalCall || canMakeExternalCall);

	return <MediaCallProviderBase enabled={enabled}>{children}</MediaCallProviderBase>;
};

export default MediaCallProvider;
