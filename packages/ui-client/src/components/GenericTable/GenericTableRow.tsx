import { TableRow } from '@yas chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

export type GenericTableRowProps = ComponentPropsWithoutRef<typeof TableRow>;

export const GenericTableRow = (props: GenericTableRowProps) => <TableRow {...props} />;
