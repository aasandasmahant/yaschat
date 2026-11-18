import { randomUUID } from 'crypto';

import { Users } from './fixtures/userStates';
import { HomeChannel } from './page-objects';
import { createTargetChannel, setSettingValueById } from './utils';
import { preserveSettings } from './utils/preserveSettings';
import { test, expect } from './utils/test';
import { mockServerReset, mockServerSet } from '../data/mock-server.helper';

test.use({ storageState: Users.admin.state });
const fileDescription = `Message for quote - ${Date.now()}`;
const quotedMessage = 'Quoting the attachment';
const threadQuoteMessage = 'Quoting in thread';

test.describe.parallel('Quote Attachment', () => {
	let poHomeChannel: HomeChannel;
	let targetChannel: string;

	test.beforeAll(async ({ api }) => {
		targetChannel = await createTargetChannel(api);
	});

	test.beforeEach(async ({ page }) => {
		poHomeChannel = new HomeChannel(page);
		await poHomeChannel.gotoChannel(targetChannel);
	});

	test.afterAll(async ({ api }) => {
		expect((await api.post('/channels.delete', { roomName: targetChannel })).status()).toBe(200);
	});

	test('should show file preview and description when quoting a message with attachment', async () => {
		const imageFileName = 'test-image.jpeg';
		await test.step('Send message with attachment in the channel', async () => {
			await poHomeChannel.content.sendFileMessage(imageFileName);
			await poHomeChannel.composer.inputMessage.fill(fileDescription);
			await poHomeChannel.composer.btnSend.click();

			// Wait for the file to be uploaded and message to be sent
			await expect(poHomeChannel.content.lastUserMessage).toBeVisible();
			await expect(poHomeChannel.content.getFileDescription).toContainText(fileDescription);
		});
		await test.step('Quote the message with attachment', async () => {
			await poHomeChannel.content.lastUserMessage.hover();
			await poHomeChannel.content.btnQuoteMessage.click();

			// Verify the quote preview shows both file and description
			await expect(poHomeChannel.content.quotePreview).toBeVisible();
			await expect(poHomeChannel.content.quotePreview).toContainText(fileDescription);
			await expect(poHomeChannel.content.quotePreview).toContainText(imageFileName);

			// Send the quoted message
			await poHomeChannel.content.sendMessage(quotedMessage);
		});
		await test.step('Verify the quoted message appears correctly', async () => {
			await expect(poHomeChannel.content.quotedFileDescription(fileDescription)).toBeVisible();
			await expect(poHomeChannel.content.quotedFileName(imageFileName)).toBeVisible();
			await expect(poHomeChannel.content.lastUserMessage).toContainText(quotedMessage);
		});
	});

	test('should show file preview and description when quoting attachment file within a thread', async ({ page }) => {
		const textFileName = 'any_file.txt';

		await test.step('Send initial message in channel', async () => {
			await poHomeChannel.content.sendMessage('Initial message for thread test');
		});

		await test.step('Create thread and send message with attachment', async () => {
			// Open thread
			await poHomeChannel.content.openReplyInThread();
			// Send file in thread
			await expect(page).toHaveURL(/.*thread/);

			await poHomeChannel.content.dragAndDropTxtFileToThread();
			await poHomeChannel.content.sendMessageInThread(fileDescription);

			await expect(poHomeChannel.content.lastThreadMessageFileDescription).toHaveText(fileDescription);
			await expect(poHomeChannel.content.getLastThreadMessageByFileName(textFileName)).toBeVisible();
		});

		await test.step('Quote the message with attachment in thread', async () => {
			await poHomeChannel.content.lastUserThreadMessage.hover();
			await poHomeChannel.content.btnQuoteMessage.click();

			// Verify the quote preview shows both file and description
			await expect(poHomeChannel.content.threadQuotePreview).toBeVisible();
			await expect(poHomeChannel.content.threadQuotePreview).toContainText(fileDescription);
			await expect(poHomeChannel.content.threadQuotePreview).toContainText(textFileName);

			// Send the quoted message in thread
			await poHomeChannel.content.sendMessageInThread(threadQuoteMessage);
			await poHomeChannel.content.threadQuotePreview.waitFor({ state: 'hidden' });
		});

		await test.step('Verify the quoted message appears correctly in thread', async () => {
			await expect(poHomeChannel.content.lastUserThreadMessage).toBeVisible();
			await expect(poHomeChannel.content.threadMessageQuotedFileDescription(fileDescription)).toBeVisible();
			await expect(poHomeChannel.content.threadMessageQuotedFileName(textFileName)).toBeVisible();
			await expect(poHomeChannel.content.lastUserThreadMessage).toContainText(threadQuoteMessage);
		});
	});

	test.describe('Link preview', () => {
		const url = new URL(`/page/quote-preview-${randomUUID()}`, process.env.OEMBED_MOCK_SERVER_URL || 'http://mock-server.dev:8080');
		const title = 'Quote preview fixture';
		const originalSettings = preserveSettings(['API_EmbedSafePorts', 'SSRF_Allowlist']);

		test.beforeAll(async ({ api }) => {
			await expect(await setSettingValueById(api, 'API_EmbedSafePorts', `${originalSettings.API_EmbedSafePorts},${url.port}`)).toBeOK();
			await expect(await setSettingValueById(api, 'SSRF_Allowlist', `${originalSettings.SSRF_Allowlist},${url.host}`)).toBeOK();
			await mockServerSet('GET', url.pathname, `<html><head><title>${title}</title>  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath fill='%2300b4d8' d='M52 24c-6-8-18-10-28-4-5 3-9 8-12 12-4-3-8-5-10-4 2 4 2 8 0 12 2 1 6-1 10-4 3 4 7 9 12 12 10 6 22 4 28-4 4-5 4-15 0-20z'/%3E%3Ccircle cx='44' cy='30' r='3' fill='%23fff'/%3E%3C/svg%3E">
</head></html>`);
		});

		test.afterAll(async () => {
			await mockServerReset();
		});

		test('should show link preview when quoting a link with preview', async () => {
			const testLink = url.toString();

			await test.step('Send link message in channel', async () => {
				await poHomeChannel.content.sendMessage(testLink);
				await expect(poHomeChannel.content.lastUserMessage).toContainText(testLink);
				await expect(poHomeChannel.content.linkPreview).toBeVisible();
				await expect(poHomeChannel.content.lastUserMessage).toContainText(title);
			});

			await test.step('Quote the link message', async () => {
				await poHomeChannel.content.lastUserMessage.hover();
				await poHomeChannel.content.btnQuoteMessage.click();

				// Verify the quote preview shows the link
				await expect(poHomeChannel.content.quotePreview).toBeVisible();
				await expect(poHomeChannel.content.quotePreview).toContainText(testLink);

				// Send the quoted message
				await poHomeChannel.content.sendMessage(quotedMessage);
			});

			await test.step('Verify the quoted message appears correctly', async () => {
				await expect(poHomeChannel.content.quotedLinkText(testLink)).toBeVisible();
				await expect(poHomeChannel.content.lastUserMessage).toContainText(quotedMessage);
			});
		});
	});
});
