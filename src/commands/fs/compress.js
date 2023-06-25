import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';

import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';
import message from '../../console/messages.js';

export const Compress = {
  name: 'Compress',
  description: 'Compress file (used Brotli algorithm)',
  usage: 'compress path_to_file path_to_destination',
  perform: async (args) => {
    const fileToCompessPath = getAbsPath(args[0]);
    const fileArchivePath = getAbsPath(args[1]);

    const stats = await getStats(fileToCompessPath);
    if (stats.err) {
      throw new Error('Operation failed: file not found');
    }
    if (!stats.info.isFile()) {
      throw new Error('Operation failed: ' + fileToCompessPath + ' not a file');
    }

    const statsTo = await getStats(fileArchivePath);
    if (!statsTo.err) {
      if (statsTo.info.isDirectory()) {
        throw new Error(
          'Operation failed: ' + fileArchivePath + ' is a directory'
        );
      }
      throw new Error('Operation failed: file already exists');
    }

    try {
      const readStream = createReadStream(fileToCompessPath);
      const writeStream = createWriteStream(fileArchivePath);
      await pipeline(readStream, createBrotliCompress(), writeStream);
      message.showSystemInfo('File successfully compressed');
    } catch (err) {
      throw new Error('Operation failed : ' + err.message);
    }
  },
};
