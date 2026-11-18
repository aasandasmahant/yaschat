import { Box } from '@yas chat/fuselage';
import { MessageComposerSkeleton } from '@yas chat/ui-composer';

const ComposerSkeleton = () => {
	return (
		<>
			<MessageComposerSkeleton />
			<Box height='x24' />
		</>
	);
};

export default ComposerSkeleton;
