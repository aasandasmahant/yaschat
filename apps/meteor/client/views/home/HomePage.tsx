import YasChatHomeBanner from './YasChatHomeBanner';
import YasChatNavBar from './YasChatNavBar';
import { useSetting } from '@yaschat/ui-contexts';

import CustomHomePage from './CustomHomePage';
import DefaultHomePage from './DefaultHomePage';
import { YasChatHomeDiscoverySection } from './YasChatHomeDiscoverySection';

const HomePage = () => {
	const customOnly = useSetting('Layout_Custom_Body_Only');

	if (customOnly) {
		return (<><CustomHomePage /><YasChatHomeDiscoverySection /></>);
	}

	return (
    <>
      <YasChatNavBar />
      <YasChatHomeBanner />
      <DefaultHomePage />
			<YasChatHomeDiscoverySection />
    </>
  );
};

export default HomePage;
