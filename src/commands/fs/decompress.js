import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';

import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';
import message from '../../console/messages.js';

export const Decompress = {
  name: 'Decompress',
  description: 'Decompress  file (used Brotli algorithm)',
  usage: 'decompress path_to_file path_to_destination',
  perform: async (args) => {
    const fileArchivePath = getAbsPath(args[0]);
    const fileToDecompessPath = getAbsPath(args[1]);

    const stats = await getStats(fileArchivePath);
    if (stats.err) {
      throw new Error('Operation failed: file not found');
    }
    if (!stats.info.isFile()) {
      throw new Error('Operation failed: ' + fileArchivePath + ' not a file');
    }

    const statsTo = await getStats(fileToDecompessPath);
    if (!statsTo.err) {
      if (statsTo.info.isDirectory()) {
        throw new Error(
          'Operation failed: ' + fileToDecompessPath + ' is a directory'
        );
      }
      throw new Error('Operation failed: file already exists');
    }

    try {
      const readStream = createReadStream(fileArchivePath);
      const writeStream = createWriteStream(fileToDecompessPath);
      await pipeline(readStream, createBrotliDecompress(), writeStream);
      message.showSystemInfo('File successfully decompressed');
    } catch (err) {
      throw new Error('Operation failed : ' + err.message);
    }
  },
};
