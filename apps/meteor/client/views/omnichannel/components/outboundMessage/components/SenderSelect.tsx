import type { IOutboundProviderMetadata } from '@yaschat/core-typings';
import { Select } from '@yaschat/fuselage';
import { useMemo, type ComponentProps } from 'react';

import { formatPhoneNumber } from '../../../../../lib/formatPhoneNumber';

export type SenderSelectProps = Omit<ComponentProps<typeof Select>, 'options'> & {
	provider: IOutboundProviderMetadata | undefined;
};

const SenderSelect = ({ provider, value, onChange, ...props }: SenderSelectProps) => {
	const options = useMemo<[string, string][]>(() => {
		if (!provider) {
			return [];
		}

		return Object.keys(provider.templates).map((sender) => {
			return provider.providerType === 'phone' ? [sender, formatPhoneNumber(sender)] : [sender, sender];
		});
	}, [provider]);

	return <Select {...props} value={value} options={options} onChange={onChange} />;
};

export default SenderSelect;
