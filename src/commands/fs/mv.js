import path from 'path';
import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';
import message from '../../console/messages.js';
import { createReadStream, createWriteStream } from 'fs';
import { rm as removeFile } from 'fs/promises';

export const Mv = {
  name: 'Mv',
  description: 'Move file',
  usage: 'mv path_to_file path_to_new_directory',
  perform: async (args) => {
    if (args.length != 2) {
      throw new Error('Invalid input: command must have two arguments');
    }

    const fileFromPath = getAbsPath(args[0]);
    const pathTo = getAbsPath(args[1]);

    const fileToPath = path.resolve(pathTo, path.basename(fileFromPath));

    const statsFrom = await getStats(fileFromPath);
    if (statsFrom.err) {
      throw new Error('Operation failed: file not found');
    }

    const statsToPath = await getStats(pathTo);
    if (statsToPath.err) {
      throw new Error('Operation failed: ' + statsToPath.err.message);
    }
    if (!statsToPath.info.isDirectory()) {
      throw new Error('Operation failed: ' + pathTo + ' not a directory');
    }

    const statsTo = await getStats(fileToPath);
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
      throw new Error('Operation failed : ' + err.message);
    }
  },
};
