import { render, screen } from '@testing-library/react';

import YasChatLogo from './YasChatLogo';

it('renders the YasChat logo', () => {
	render(<YasChatLogo />);
	expect(screen.getByLabelText('YasChat')).toBeInstanceOf(SVGSVGElement);
});
