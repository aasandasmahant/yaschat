import type { NavBarSearchFormValues } from '@yaschat/ai-search';
import { FormProvider, useForm } from 'react-hook-form';

import NavBarAISearchInput from './NavBarAISearchInput';

const NavBarAISearch = () => {
	const methods = useForm<NavBarSearchFormValues>({ defaultValues: { filterText: '', filters: [] } });

	return (
		<FormProvider {...methods}>
			<NavBarAISearchInput />
		</FormProvider>
	);
};

export default NavBarAISearch;
