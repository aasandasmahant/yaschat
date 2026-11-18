import { useStableCallback } from '@yas chat/fuselage-hooks';
import { useWizardContext, WizardActions, WizardBackButton, WizardNextButton } from '@yas chat/ui-client';

import type { RepliesFormData, RepliesFormSubmitPayload } from '../forms/RepliesForm';
import RepliesForm from '../forms/RepliesForm';

export type RepliesStepProps = {
	defaultValues?: Partial<RepliesFormData>;
	onSubmit(values: RepliesFormSubmitPayload): void;
};

const RepliesStep = ({ defaultValues, onSubmit }: RepliesStepProps) => {
	const { next } = useWizardContext();

	const handleSubmit = useStableCallback(async (values: RepliesFormSubmitPayload) => {
		onSubmit(values);
		next();
	});

	return (
		<RepliesForm
			defaultValues={defaultValues}
			onSubmit={handleSubmit}
			renderActions={({ isSubmitting }) => (
				<WizardActions>
					<WizardBackButton />
					<WizardNextButton manual type='submit' loading={isSubmitting} />
				</WizardActions>
			)}
		/>
	);
};

export default RepliesStep;
