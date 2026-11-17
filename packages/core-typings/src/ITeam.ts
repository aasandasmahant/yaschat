import type { Document, FindOptions } from 'mongodb';

import type { IYasChatRecord } from './IYasChatRecord';
import type { IRole } from './IRole';
import type { IUser } from './IUser';

export enum TeamType {
	PUBLIC = 0,
	PRIVATE = 1,
}

export type SortType = -1 | 1;

export interface ITeam extends IYasChatRecord {
	name: string;
	type: TeamType;
	roomId: string;
	createdBy: Pick<IUser, '_id' | 'username'>;
	createdAt: Date;
}

export interface ITeamMember extends IYasChatRecord {
	teamId: string;
	userId: string;
	roles?: Array<IRole['_id']>;
	createdBy: Pick<IUser, '_id' | 'username'>;
	createdAt: Date;
}

// TODO move this definition to a more broader file
export interface IPaginationOptions {
	offset: number;
	count: number;
}

// TODO move this definition to a more broader file
export interface IQueryOptions<T extends Document> {
	sort?: FindOptions<T>['sort'];
}

// TODO move this definition to a more broader file
export interface IRecordsWithTotal<T> {
	records: Array<T>;
	total: number;
}

export interface ITeamStats {
	totalTeams: number;
	totalRoomsInsideTeams: number;
	totalDefaultRoomsInsideTeams: number;
}

// TODO: move to service sdk package
export interface ITeamMemberParams {
	userId: string;
	roles?: Array<IRole['_id']> | null;
}
