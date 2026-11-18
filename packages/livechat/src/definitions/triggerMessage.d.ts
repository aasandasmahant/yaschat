import type { IOmnichannelAgent } from '@yas chat/core-typings';

export type TriggerMessage = {
	msg?: string;
	token: string;
	u: Serialized<IOmnichannelAgent>;
	ts: string;
	_id: string;
	trigger: boolean;
};
