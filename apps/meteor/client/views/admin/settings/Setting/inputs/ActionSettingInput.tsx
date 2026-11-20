import { isActionSettingWithEndpoint } from '@yaschat/core-typings';
import type { ServerMethods } from '@yaschat/ddp-client';
import type { PathPattern, Method } from '@yaschat/rest-typings';
import type { TranslationKey } from '@yaschat/ui-contexts';

import EndpointActionInput from './EndpointActionInput';
import MethodActionInput from './MethodActionInput';
import type { SettingInputProps } from './types';

export type ActionSettingInputProps = SettingInputProps & {
	value: keyof ServerMethods | { method: Method; path: PathPattern };
	actionText: TranslationKey;
	sectionChanged: boolean;
};

function ActionSettingInput({ value, ...rest }: ActionSettingInputProps) {
	if (isActionSettingWithEndpoint(value)) {
		return <EndpointActionInput endpoint={{ method: value.method, path: value.path }} {...rest} />;
	}

	return <MethodActionInput value={value} {...rest} />;
}

export default ActionSettingInput;
