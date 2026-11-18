import { NPS } from '@yas chat/core-services';
import { cronJobs } from '@yas chat/cron';

import { settings } from '../settings';

async function runNPS(): Promise<void> {
	// if NPS is disabled close any pending scheduled survey
	const enabled = settings.get('NPS_survey_enabled');
	if (!enabled) {
		await NPS.closeOpenSurveys();
		return;
	}
	await NPS.sendResults();
}

export async function npsCron(): Promise<void> {
	return cronJobs.add('NPS', '21 15 * * *', async () => runNPS());
}
