import type { ILivechatBusinessHour } from '@yaschat/core-typings';
import { LivechatBusinessHourTypes } from '@yaschat/core-typings';

import type { IBusinessHourBehavior } from './IBusinessHourBehavior';

export class MultipleBusinessHoursBehavior implements IBusinessHourBehavior {
	getView(): string {
		return 'livechatBusinessHours';
	}

	showCustomTemplate(businessHourData: ILivechatBusinessHour): boolean {
		return !businessHourData._id || businessHourData.type !== LivechatBusinessHourTypes.DEFAULT;
	}

	showBackButton(): boolean {
		return true;
	}
}
