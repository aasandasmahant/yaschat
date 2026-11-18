import type { IInstanceStatus } from '@yas chat/core-typings';

declare const connection:
	| {
			_id: string;
			address: string;
			currentStatus: IInstanceStatus['currentStatus'];
			instanceRecord: IInstanceStatus['instanceRecord'];
			broadcastAuth: boolean;
	  }
	| undefined;

export as namespace connection;
