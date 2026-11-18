import type { Inquiries } from '@yas chat/core-typings';

import { useOmnichannel } from './useOmnichannel';

export const useQueuedInquiries = (): Inquiries => useOmnichannel().inquiries;
