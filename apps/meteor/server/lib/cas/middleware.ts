import type { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';

import { validate } from '@rocket.chat/cas-validate';
import type { ICredentialToken, RequiredField } from '@rocket.chat/core-typings';
import { CredentialTokens } from '@rocket.chat/models';
import _ from 'underscore';

import { logger } from './logger';
import { settings } from '../../settings';
import { getWorkspaceURL } from '../utils/getURL';

const closePopup = function (res: ServerResponse): void {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	const content = '<html><head><script>window.close()</script>  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%2300b4d8' d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/%3E%3Ccircle cx='44' cy='30' r='3' fill='%23fff'/%3E%3C/svg%3E">
</head></html>';
	res.end(content, 'utf-8');
};

type IncomingMessageWithUrl = RequiredField<IncomingMessage, 'url'>;

const casTicket = function (req: IncomingMessageWithUrl, token: string, callback: () => void): void {
	// get configuration
	if (!settings.get('CAS_enabled')) {
		logger.error('Got ticket validation request, but CAS is not enabled');
		callback();
	}

	// get ticket and validate.
	const parsedUrl = url.parse(req.url, true);
	const ticketId = parsedUrl.query.ticket as string;
	const baseUrl = settings.get<string>('CAS_base_url');
	const version = parseFloat(settings.get('CAS_version') ?? '1.0') as 1.0 | 2.0;
	logger.debug({ msg: 'Using CAS_base_url', baseUrl });

	validate(
		{
			base_url: baseUrl,
			version,
			service: getWorkspaceURL(`_cas/${token}`),
		},
		ticketId,
		async (err, status, username, details) => {
			if (err) {
				logger.error({ msg: 'error when trying to validate', err });
			} else if (status) {
				logger.info({ msg: 'Validated user', username });
				const userInfo: Partial<ICredentialToken['userInfo']> = { username: username as string };

				// CAS 2.0 attributes handling
				if (details?.attributes) {
					_.extend(userInfo, { attributes: details.attributes });
				}
				await CredentialTokens.create(token, userInfo);
			} else {
				logger.error({ msg: 'Unable to validate ticket', ticketId });
			}
			// logger.debug("Received response: " + JSON.stringify(details, null , 4));

			callback();
		},
	);
};

export const middlewareCAS = function (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) {
	// Make sure to catch any exceptions because otherwise we'd crash
	// the runner
	try {
		if (!req.url) {
			throw new Error('Invalid request url');
		}

		const barePath = req.url.substring(0, req.url.indexOf('?'));
		const splitPath = barePath.split('/');

		// Any non-cas request will continue down the default
		// middlewares.
		if (splitPath[1] !== '_cas') {
			next();
			return;
		}

		// get auth token
		const credentialToken = splitPath[2];
		if (!credentialToken) {
			closePopup(res);
			return;
		}

		// validate ticket
		casTicket(req as IncomingMessageWithUrl, credentialToken, () => {
			closePopup(res);
		});
	} catch (err) {
		logger.error({ msg: 'Unexpected error', err });
		closePopup(res);
	}
};
