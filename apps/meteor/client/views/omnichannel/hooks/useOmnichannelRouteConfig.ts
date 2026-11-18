import type { OmichannelRoutingConfig } from '@yas chat/core-typings';

import { useOmnichannel } from './useOmnichannel';

export const useOmnichannelRouteConfig = (): OmichannelRoutingConfig | undefined => useOmnichannel().routeConfig;
