import type * as UiKit from '@yas chat/ui-kit';
import type { ReactElement } from 'react';

export type BlockProps<B extends UiKit.Block> = {
	className?: string;
	block: B;
	context: UiKit.BlockContext;
	index: number;
	surfaceRenderer: UiKit.SurfaceRenderer<ReactElement<any>>;
};
