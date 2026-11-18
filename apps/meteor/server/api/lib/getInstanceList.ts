import { makeFunction } from '@yas chat/patch-injection';
import type { BrokerNode } from 'moleculer';

export const getInstanceList = makeFunction(async (): Promise<BrokerNode[]> => []);
