import semver from 'semver';

import type { DeprecationLoggerNextPlannedVersion } from './deprecationWarningLogger';
import { Info } from '../../yaschat.info';

export const shouldBreakInVersion = (version: DeprecationLoggerNextPlannedVersion) =>
	semver.gte(semver.coerce(Info.version) ?? Info.version, version);
