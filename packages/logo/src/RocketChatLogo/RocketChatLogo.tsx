import type { SVGAttributes } from 'react';

type YasChatLogoProps = {
	color?: SVGAttributes<SVGSVGElement>['fill'];
};

export const YasChatLogo = ({ color = 'currentColor' }: YasChatLogoProps) => (
	<svg
		width='1em'
		height='1em'
		viewBox='0 0 120 120'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		role='img'
		aria-label='YasChat Leaping Fish Logo'
	>
		<path
			d='M20 88C34 52 64 24 100 22C92 40 85 55 98 68C76 74 56 72 40 64L22 90L27 70L12 72L20 88Z'
			stroke={color}
			strokeWidth='5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M42 54C56 44 72 38 86 35'
			stroke={color}
			strokeWidth='3'
			strokeLinecap='round'
			strokeDasharray='5 5'
		/>
		<circle cx='83' cy='35' r='3.5' fill={color} />
		<path d='M52 47H68M47 56H62' stroke={color} strokeWidth='3' strokeLinecap='round' />
	</svg>
);

export default YasChatLogo;
