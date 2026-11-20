import { useSessionStorage } from '@yaschat/fuselage-hooks';
import { useRouteParameter } from '@yaschat/ui-contexts';

const KEY = 'saml_invite_token';

export const useSamlInviteToken = () => {
	const token = useRouteParameter('hash');
	return useSessionStorage(KEY, token || null);
};
