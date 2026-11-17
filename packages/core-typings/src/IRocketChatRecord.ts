import type { WithId } from 'mongodb';
import * as z from 'zod';

import { TimestampSchema } from './utils';

export const IYasChatRecordSchema = z.object({
	_id: z.string(),
	_updatedAt: TimestampSchema,
});

export type IYasChatRecord = z.infer<typeof IYasChatRecordSchema>;

export type YasChatRecordDeleted<T> = WithId<T> & {
	_updatedAt: Date;
	_deletedAt: Date;
	__collection__: string;
};
