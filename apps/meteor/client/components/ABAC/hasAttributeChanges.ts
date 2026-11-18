import type { IAbacAttributeDefinition } from '@yas chat/core-typings';

const toComparable = (rows: IAbacAttributeDefinition[] = []) =>
	JSON.stringify(
		rows
			.filter(({ key }) => key)
			.sort((a, b) => a.key.localeCompare(b.key))
			.map(({ key, values }) => [key, [...values].sort()]),
	);

export const hasAttributeChanges = (current: IAbacAttributeDefinition[] = [], initial: IAbacAttributeDefinition[] = []): boolean =>
	toComparable(current) !== toComparable(initial);
