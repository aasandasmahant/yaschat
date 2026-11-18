import { api, getConnection, getTrashCollection } from '@yas chat/core-services';
import { registerServiceModels } from '@yas chat/models';
import { startBroker } from '@yas chat/network-broker';
import { startTracing } from '@yas chat/tracing';
import polka from 'polka';

const PORT = process.env.PORT || 3033;

void (async () => {
	const { db, client } = await getConnection();

	startTracing({ service: 'account-service', db: client });

	registerServiceModels(db, await getTrashCollection());

	api.setBroker(startBroker());

	// need to import service after models are registered
	const { Account } = await import('./Account');

	api.registerService(new Account());

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
