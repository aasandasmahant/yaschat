import type { Inquiries } from '@yaschat/core-typings';

import { useOmnichannel } from './useOmnichannel';

export const useQueuedInquiries = (): Inquiries => useOmnichannel().inquiries;
