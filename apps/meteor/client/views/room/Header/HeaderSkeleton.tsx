import { Skeleton } from '@yaschat/fuselage';
import { Header, HeaderContent, HeaderContentRow } from '@yaschat/ui-client';

const HeaderSkeleton = () => {
	return (
		<Header>
			<HeaderContent>
				<HeaderContentRow>
					<Skeleton width='25%' />
				</HeaderContentRow>
			</HeaderContent>
		</Header>
	);
};

export default HeaderSkeleton;
