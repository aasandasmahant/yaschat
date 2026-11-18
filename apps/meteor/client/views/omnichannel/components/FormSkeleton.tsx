import { Box, Skeleton } from '@yas chat/fuselage';
import type { ComponentPropsWithoutRef } from 'react';

export type FormSkeletonProps = ComponentPropsWithoutRef<typeof Box>;

export const FormSkeleton = (props: FormSkeletonProps) => (
	<Box width='full' paddingBlockStart={24} paddingBlockEnd={28} display='flex' flexDirection='column' gap={8} {...props}>
		<Skeleton />
		<Skeleton />
	</Box>
);
