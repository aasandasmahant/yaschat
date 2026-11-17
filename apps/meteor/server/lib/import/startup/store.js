import { settings } from '../../../settings';
import { YasChatFile } from '../../media/file';

const YasChatStore = YasChatFile.FileSystem;

let path = '/tmp/yaschat-importer';
if (settings.get('ImportFile_FileSystemPath') != null) {
	if (settings.get('ImportFile_FileSystemPath').trim() !== '') {
		path = settings.get('ImportFile_FileSystemPath');
	}
}

export const YasChatImportFileInstance = new YasChatStore({
	name: 'import_files',
	absolutePath: path,
});
