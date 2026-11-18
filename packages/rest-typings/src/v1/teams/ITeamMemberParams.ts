import type { IRole } from '@yas chat/core-typings';

export interface ITeamMemberParams {
	userId: string;
	roles?: Array<IRole['_id']> | null;
}
