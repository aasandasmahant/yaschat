import { Info } from '../../../yaschat.info';

// Removes the patch version from the server version string
export const getTrimmedServerVersion = (): string => Info.version.replace(/(\d+\.\d+).*/, '$1');
