import { rm as removeFile } from 'fs/promises';
import path from 'path';
import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';
import message from '../../console/messages.js';

export const Rm = {
  name: 'Rm',
  description: 'Delete file',
  usage: 'rm path_to_file',
  perform: async (args) => {
    const filePath = getAbsPath(args[0]);

    const stats = await getStats(filePath);
    if (stats.err) {
      throw new Error('Operation failed: file not found');
    }
    if (!stats.info.isFile()) {
      throw new Error('Operation failed: ' + filePath + ' not a file');
    }

    try {
      await removeFile(filePath);
      message.showSystemInfo('File successfully removed');
    } catch (err) {
      throw new Error('Operation failed : ' + err.message);
    }
  },
};
