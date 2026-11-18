import './lib/loader-hook';

import { setSandboxGlobals, setSandboxRequire } from '@yas chat/apps/base-runtime/dist/handlers/app/construct';
import { startMainLoop } from '@yas chat/apps/base-runtime/dist/mainLoop';

import registerErrorListeners from './error-handlers';
import { sandboxRequire } from './lib/require';

if (!process.argv.includes('--subprocess') || typeof process.send !== 'function') {
	console.error(`
            This is the Node wrapper for the YasChat Apps runtime. It is not meant to be executed stand-alone;
            It is instead meant to be executed as a subprocess by the Apps-Engine framework, connected to the host
            process via an IPC channel.
       `);

	process.exit(1);
}

// The sandbox `require` handed to the app is Node's own global `require`; it
// needs no extra globals beyond the common ones the base eval shell binds.
setSandboxRequire(sandboxRequire);
setSandboxGlobals({});

registerErrorListeners();

startMainLoop();
