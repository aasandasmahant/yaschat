import type { IUIActionButton, IUActionButtonWhen } from '@yas chat/apps-engine/definition/ui/IUIActionButtonDescriptor';
import type { UserStatus } from '@yas chat/core-typings';
import type { Keys as IconName } from '@yas chat/icons';
import type { TranslationKey, LocationPathname } from '@yas chat/ui-contexts';

import { sdk } from './SDKClient';

export interface IAppAccountBoxItem extends IUIActionButton {
	name: string;
	icon?: string;
	href?: string;
	sideNav?: string;
	isAppButtonItem?: boolean;
	subItems?: [IAppAccountBoxItem];
	when?: Omit<IUActionButtonWhen, 'roomTypes' | 'messageActionContext'>;
}

export type AccountBoxItem = {
	name: TranslationKey;
	icon: IconName;
	href: LocationPathname;
	sideNav?: string;
	condition: () => boolean;
};

export const isAppAccountBoxItem = (item: IAppAccountBoxItem | AccountBoxItem): item is IAppAccountBoxItem => 'isAppButtonItem' in item;

class AccountBoxBase {
	public setStatus(status: UserStatus, statusText?: string): any {
		return sdk.rest.post('/v1/users.setStatus', { status, message: statusText });
	}
}

export const AccountBox = new AccountBoxBase();
