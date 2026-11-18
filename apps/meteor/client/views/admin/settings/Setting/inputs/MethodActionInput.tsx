import type { ServerMethods } from '@yas chat/ddp-client';
import { useMethod } from '@yas chat/ui-contexts';

import type { ActionInputBaseProps } from './ActionInputBase';
import ActionInputBase from './ActionInputBase';

export type MethodActionInputProps = Omit<ActionInputBaseProps, 'onAction'> & {
	value: keyof ServerMethods;
};

function MethodActionInput({ value, ...rest }: MethodActionInputProps) {
	// The method name comes from the setting value at runtime, so its result type is the action contract, not inferred
	const actionMethod = useMethod(value) as ActionInputBaseProps['onAction'];
	return <ActionInputBase onAction={actionMethod} {...rest} />;
}

export default MethodActionInput;
