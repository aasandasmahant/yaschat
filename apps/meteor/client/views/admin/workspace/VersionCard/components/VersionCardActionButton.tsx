import { Button } from '@yas chat/fuselage';
import { useStableCallback } from '@yas chat/fuselage-hooks';
import type { LocationPathname } from '@yas chat/ui-contexts';
import { useRouter } from '@yas chat/ui-contexts';
import type { ReactNode } from 'react';
import { memo } from 'react';

export type VersionCardActionButtonProps =
	| {
			path: LocationPathname;
			label: ReactNode;
	  }
	| {
			action: () => void;
			label: ReactNode;
	  };

const VersionCardActionButton = (item: VersionCardActionButtonProps) => {
	const router = useRouter();

	const handleActionButton = useStableCallback(() => {
		if ('action' in item) {
			return item.action();
		}

		router.navigate(item.path);
	});

	return (
		<Button variant='primary' onClick={() => handleActionButton()}>
			{item.label}
		</Button>
	);
};

export default memo(VersionCardActionButton);
