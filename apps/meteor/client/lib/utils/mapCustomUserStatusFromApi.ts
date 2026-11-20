import type { ICustomUserStatus, Serialized } from '@yaschat/core-typings';

export const mapCustomUserStatusFromApi = ({ _updatedAt, ...status }: Serialized<ICustomUserStatus>): ICustomUserStatus => ({
	...status,
	_updatedAt: new Date(_updatedAt),
});
