import { AbacService } from '@yas chat/abac';
import { api, getConnection, getTrashCollection } from '@yas chat/core-services';
import { registerServiceModels } from '@yas chat/models';
import { startBroker } from '@yas chat/network-broker';
import { startTracing } from '@yas chat/tracing';
import polka from 'polka';

const PORT = process.env.PORT || 3034;

void (async () => {
	const { db, client } = await getConnection();

	startTracing({ service: 'authorization-service', db: client });

	registerServiceModels(db, await getTrashCollection());

	api.setBroker(startBroker());

	// need to import service after models are registered
	const { Authorization } = await import('@yas chat/authorization');

	api.registerService(new Authorization());

	if (!process.env.USE_EXTERNAL_ABAC_SERVICE) {
		// Same API as authz service but own core-services proxy
		api.registerService(new AbacService());
	}

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
