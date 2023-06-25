import { rename as renameFile } from 'fs/promises';
import path from 'path';
import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';
import message from '../../console/messages.js';

export const Rn = {
  name: 'Rn',
  description: 'Rename file',
  usage: 'rn path_to_file new_filename',
  perform: async (args) => {
    if (args.length != 2) {
      throw new Error('Invalid input: command must have two arguments');
    }

    const fileOldPath = getAbsPath(args[0]);
    const fileNewPath = path.resolve(path.dirname(fileOldPath), args[1]);

    const statsOld = await getStats(fileOldPath);
    if (statsOld.err) {
      throw new Error('Operation failed: file not found');
    }
    const statsNew = await getStats(fileNewPath);
    if (!statsNew.err) {
      throw new Error('Operation failed: file already exists');
    }

    try {
      await renameFile(fileOldPath, fileNewPath);
      message.showSystemInfo('File successfully renamed');
    } catch (err) {
      throw new Error('Operation failed : ' + err.message);
    }
  },
};
