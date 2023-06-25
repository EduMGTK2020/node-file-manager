import path from 'path';
import { rename as renameFile } from 'fs/promises';
import { fsGetStats, fsGetAbsPath } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const rn = {
  name: 'Rn',
  description: 'Rename file',
  usage: 'rn path_to_file new_filename',
  perform: async (args) => {
    const fileOldPath = fsGetAbsPath(args[0]);
    const fileNewPath = path.resolve(path.dirname(fileOldPath), args[1]);

    if(path.dirname(fileOldPath) != path.dirname(fileNewPath)) {
      throw new Error('Operation failed: files will be in different directories, to move use MV command');
    }
    
    const statsOld = await fsGetStats(fileOldPath);
    if (statsOld.err) {
      throw new Error('Operation failed: file not found');
    }
    const statsNew = await fsGetStats(fileNewPath);
    if (!statsNew.err) {
      throw new Error('Operation failed: file already exists');
    }

    try {
      await renameFile(fileOldPath, fileNewPath);
      message.showSystemInfo('File successfully renamed');
    } catch (err) {
      throw new Error('Operation failed: ' + err.message);
    }
  },
};
