import { useBreakpoints } from '@yaschat/fuselage-hooks';

export const useCompactMode = () => {
	const breakpoint = useBreakpoints();
	return !breakpoint.includes('lg');
};
