import { Field, FieldLabel, FieldRow, FlexItem, InputBoxSkeleton, Skeleton } from '@yas chat/fuselage';

const SettingSkeleton = () => (
	<Field>
		<FlexItem align='stretch'>
			<FieldLabel>
				<Skeleton width='25%' />
			</FieldLabel>
		</FlexItem>
		<FieldRow>
			<InputBoxSkeleton />
		</FieldRow>
	</Field>
);

export default SettingSkeleton;
