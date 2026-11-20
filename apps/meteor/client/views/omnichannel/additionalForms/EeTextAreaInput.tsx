import { TextAreaInput, Field, FieldLabel, FieldRow } from '@yaschat/fuselage';
import { useHasLicenseModule } from '@yaschat/ui-client';
import type { ComponentProps } from 'react';

export type EeTextAreaInputProps = { label: string } & ComponentProps<typeof TextAreaInput>;

export const EeTextAreaInput = ({ label, ...props }: EeTextAreaInputProps) => {
	const { data: hasLicense = false } = useHasLicenseModule('livechat-enterprise');

	if (!hasLicense) {
		return null;
	}

	return (
		<Field>
			<FieldLabel>{label}</FieldLabel>
			<FieldRow>
				<TextAreaInput {...props} />
			</FieldRow>
		</Field>
	);
};

export default EeTextAreaInput;
