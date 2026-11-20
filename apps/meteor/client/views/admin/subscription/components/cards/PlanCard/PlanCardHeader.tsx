import { CardTitle, CardHeader, Icon } from '@yaschat/fuselage';

export type PlanCardHeaderProps = { name: string };

const PlanCardHeader = ({ name }: PlanCardHeaderProps) => {
	return (
		<CardHeader>
			<Icon name='yaschat' color='danger' size='x28' />
			<CardTitle variant='h3'>{name}</CardTitle>
		</CardHeader>
	);
};

export default PlanCardHeader;
