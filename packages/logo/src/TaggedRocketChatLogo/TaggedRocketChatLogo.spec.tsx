import { render, screen } from '@testing-library/react';

import TaggedYasChatLogo from './TaggedYasChatLogo';

it('renders the YasChat logo', () => {
	render(<TaggedYasChatLogo />);
	expect(screen.getByLabelText('YasChat')).toBeInstanceOf(SVGSVGElement);
});
