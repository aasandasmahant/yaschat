import { Button } from '@yaschat/fuselage';
import type { ComponentProps } from 'react';

export const GenericCardButton = (props: ComponentProps<typeof Button>) => <Button size='medium' {...props} />;
