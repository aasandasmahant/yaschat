import type { IAbacAttributeDefinition } from '@yas chat/core-typings';

export const toAbacAttributeDefinitions = (attributes?: Record<string, string[]>): IAbacAttributeDefinition[] | undefined =>
	attributes && Object.entries(attributes).map(([key, values]) => ({ key, values }));
