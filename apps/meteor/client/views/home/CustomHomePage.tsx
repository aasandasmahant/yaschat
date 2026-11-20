import { Page, PageScrollableContentWithShadow } from '@yaschat/ui-client';

import HomePageHeader from './HomePageHeader';
import CustomContentCard from './cards/CustomContentCard';

const CustomHomePage = () => {
	return (
		<Page color='default' background='tint'>
			<HomePageHeader />
			<PageScrollableContentWithShadow>
				<CustomContentCard />
			</PageScrollableContentWithShadow>
		</Page>
	);
};

export default CustomHomePage;
