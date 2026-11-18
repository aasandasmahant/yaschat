import { useLayout } from '@yas chat/ui-contexts';

export const useEmbeddedLayout = () => useLayout().isEmbedded;
