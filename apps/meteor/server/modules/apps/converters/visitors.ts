import type { IAppServerOrchestrator, IAppVisitorsConverter, IAppsVisitor } from '@yas chat/apps';
import type { ILivechatVisitor } from '@yas chat/core-typings';
import { LivechatVisitors } from '@yas chat/models';
import * as z from 'zod';

import { VisitorCodec } from './codecs';

// TODO: check if functions from this converter can be async
export class AppVisitorsConverter implements IAppVisitorsConverter {
	constructor(protected readonly orch: IAppServerOrchestrator) {
		this.orch = orch;
	}

	async convertById(id: ILivechatVisitor['_id']): Promise<IAppsVisitor | undefined> {
		const visitor = await LivechatVisitors.findOneEnabledById(id);

		return this.convertVisitor(visitor);
	}

	async convertByToken(token: string): Promise<IAppsVisitor | undefined> {
		const visitor = await LivechatVisitors.getVisitorByToken(token);

		return this.convertVisitor(visitor);
	}

	async convertVisitor(visitor: undefined | null): Promise<undefined>;

	async convertVisitor(visitor: ILivechatVisitor): Promise<IAppsVisitor>;

	async convertVisitor(visitor: ILivechatVisitor | undefined | null): Promise<IAppsVisitor | undefined>;

	async convertVisitor(visitor: ILivechatVisitor | undefined | null): Promise<IAppsVisitor | undefined> {
		if (!visitor) {
			return undefined;
		}

		return z.decode(VisitorCodec, visitor);
	}

	convertAppVisitor(visitor: undefined | null): undefined;

	convertAppVisitor(visitor: IAppsVisitor): ILivechatVisitor;

	convertAppVisitor(visitor: IAppsVisitor | undefined | null): ILivechatVisitor | undefined;

	convertAppVisitor(visitor: IAppsVisitor | undefined | null): ILivechatVisitor | undefined {
		if (!visitor) {
			return undefined;
		}

		return z.encode(VisitorCodec, visitor);
	}
}
