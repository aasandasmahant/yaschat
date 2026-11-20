import type { OmichannelRoutingConfig } from '@yaschat/core-typings';

import { useOmnichannel } from './useOmnichannel';

export const useOmnichannelRouteConfig = (): OmichannelRoutingConfig | undefined => useOmnichannel().routeConfig;
