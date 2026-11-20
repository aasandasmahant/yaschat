import { Box } from '@yaschat/fuselage';
import { MessageComposerSkeleton } from '@yaschat/ui-composer';

const ComposerSkeleton = () => {
	return (
		<>
			<MessageComposerSkeleton />
			<Box height='x24' />
		</>
	);
};

export default ComposerSkeleton;
