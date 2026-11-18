import { api, getConnection, getTrashCollection } from '@yas chat/core-services';
import { Logger } from '@yas chat/logger';
import { registerServiceModels } from '@yas chat/models';
import { startBroker } from '@yas chat/network-broker';
import { startTracing } from '@yas chat/tracing';
import polka from 'polka';

const PORT = process.env.PORT || 3038;

void (async () => {
	const { db, client } = await getConnection();

	startTracing({ service: 'queue-worker', db: client });

	registerServiceModels(db, await getTrashCollection());

	api.setBroker(startBroker());

	// need to import service after models are registeredpackagfe
	const { QueueWorker } = await import('@yas chat/omnichannel-services');

	api.registerService(new QueueWorker(db, Logger));

	await api.start();

	polka()
		.get('/health', async function (_req, res) {
			try {
				await api.nodeList();
				res.end('ok');
			} catch (err) {
				console.error('Service not healthy', err);

				res.writeHead(500);
				res.end('not healthy');
			}
		})
		.listen(PORT);
})();
