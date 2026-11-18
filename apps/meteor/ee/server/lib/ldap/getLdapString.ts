import type { ILDAPEntry } from '@yas chat/core-typings';

export function getLdapString(ldapUser: ILDAPEntry, key: string): string | undefined {
	return ldapUser[key.trim()];
}
