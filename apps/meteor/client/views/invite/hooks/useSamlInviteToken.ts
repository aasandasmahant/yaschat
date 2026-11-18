import { useSessionStorage } from '@yas chat/fuselage-hooks';
import { useRouteParameter } from '@yas chat/ui-contexts';

const KEY = 'saml_invite_token';

export const useSamlInviteToken = () => {
	const token = useRouteParameter('hash');
	return useSessionStorage(KEY, token || null);
};
