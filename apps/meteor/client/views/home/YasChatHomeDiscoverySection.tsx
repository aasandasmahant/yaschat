import React, { useState } from 'react';
import { YasChatProductDiscoveryView } from './YasChatProductDiscoveryView';

export const YasChatHomeDiscoverySection: React.FC = () => {
	const [openDiscovery, setOpenDiscovery] = useState<boolean>(true);

	return (
		<section aria-label='YasChat Global Product Discovery' style={{ marginTop: '12px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 12px 8px' }}>
				<strong>YasChat Product Discovery</strong>
				<button type='button' onClick={() => setOpenDiscovery((prev) => !prev)}>
					{openDiscovery ? 'छुपाएं' : 'खोलें'}
				</button>
			</div>

			{openDiscovery ? <YasChatProductDiscoveryView defaultBudget={10000} /> : null}
		</section>
	);
};
