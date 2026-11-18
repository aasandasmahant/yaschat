import { isActionSettingWithEndpoint } from '@yas chat/core-typings';
import type { ServerMethods } from '@yas chat/ddp-client';
import type { PathPattern, Method } from '@yas chat/rest-typings';
import type { TranslationKey } from '@yas chat/ui-contexts';

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
