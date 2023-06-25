import { rm as removeFile } from 'fs/promises';
import {fsGetStats, fsGetAbsPath} from '../../utils/shared.js';
import message from '../../console/messages.js';

export const rm = {
  name: 'Rm',
  description: 'Delete file',
  usage: 'rm path_to_file',
  perform: async (args) => {
    const filePath = fsGetAbsPath(args[0]);

    const stats = await fsGetStats(filePath);
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
      throw new Error('Operation failed: ' + err.message);
    }
  },
};
