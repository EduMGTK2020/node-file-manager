import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { rm as removeFile } from 'fs/promises';
import { fsGetStats, fsGetAbsPath } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const mv = {
  name: 'Mv',
  description: 'Move file',
  usage: 'mv path_to_file path_to_new_directory',
  perform: async (args) => {
    const fileFromPath = fsGetAbsPath(args[0]);
    const pathTo = fsGetAbsPath(args[1]);

    const fileToPath = path.resolve(pathTo, path.basename(fileFromPath));

    const statsFrom = await fsGetStats(fileFromPath);
    if (statsFrom.err) {
      throw new Error('Operation failed: file not found');
    }

    const statsToPath = await fsGetStats(pathTo);
    if (statsToPath.err) {
      throw new Error('Operation failed: ' + statsToPath.err.message);
    }
    if (!statsToPath.info.isDirectory()) {
      throw new Error('Operation failed: ' + pathTo + ' not a directory');
    }

    const statsTo = await fsGetStats(fileToPath);
    if (!statsTo.err) {
      throw new Error('Operation failed: file already exists');
    }

    try {
      const streamFrom = createReadStream(fileFromPath);
      const streamTo = createWriteStream(fileToPath);

      streamFrom.pipe(streamTo);
      await removeFile(fileFromPath);

      message.showSystemInfo('File successfully movied');
    } catch (err) {
      throw new Error('Operation failed: ' + err.message);
    }
  },
};
