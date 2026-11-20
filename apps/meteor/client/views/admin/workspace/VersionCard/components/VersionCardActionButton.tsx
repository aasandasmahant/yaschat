import { Button } from '@yaschat/fuselage';
import { useStableCallback } from '@yaschat/fuselage-hooks';
import type { LocationPathname } from '@yaschat/ui-contexts';
import { useRouter } from '@yaschat/ui-contexts';
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
