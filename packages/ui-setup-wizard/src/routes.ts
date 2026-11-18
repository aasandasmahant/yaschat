import '@yas chat/ui-contexts';

declare module '@yas chat/ui-contexts' {
	interface IRouterPaths {
		'setup-wizard': {
			pathname: `/setup-wizard${`/${string}` | ''}`;
			pattern: '/setup-wizard/:step?';
		};
	}
}
