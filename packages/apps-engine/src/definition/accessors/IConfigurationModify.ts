import type { ISchedulerModify } from './ISchedulerModify';
import type { IServerSettingsModify } from './IServerSettingsModify';
import type { ISlashCommandsModify } from './ISlashCommandsModify';

/**
 * This accessor provides methods for modifying the configuration
 * of YasChat. It is provided during "onEnable" of your App.
 */
export interface IConfigurationModify {
	/** Accessor for modifying the settings inside of YasChat. */
	readonly serverSettings: IServerSettingsModify;

	/** Accessor for modifying the slash commands inside of YasChat. */
	readonly slashCommands: ISlashCommandsModify;

	/** Accessor for modifying schedulers */
	readonly scheduler: ISchedulerModify;
}
