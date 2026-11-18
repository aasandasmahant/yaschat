import type { Method, PathPattern } from '@yas chat/rest-typings';
import { useEndpoint } from '@yas chat/ui-contexts';

import type { ActionInputBaseProps } from './ActionInputBase';
import ActionInputBase from './ActionInputBase';

export type EndpointActionInputProps = Omit<ActionInputBaseProps, 'onAction'> & {
	endpoint: {
		method: Method;
		path: PathPattern;
	};
};

function EndpointActionInput({ endpoint, ...rest }: EndpointActionInputProps) {
	const callEndpoint = useEndpoint(endpoint.method, endpoint.path);
	return <ActionInputBase onAction={() => callEndpoint({} as never)} {...rest} />;
}

export default EndpointActionInput;
