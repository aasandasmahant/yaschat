import type { ILivechatBusinessHour } from '@yaschat/core-typings';

export interface IBusinessHourBehavior {
	getView(): string;
	showCustomTemplate(businessHourData: ILivechatBusinessHour): boolean;
	showBackButton(): boolean;
}
