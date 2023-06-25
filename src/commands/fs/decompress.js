import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { fsGetStats, fsGetAbsPath } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const decompress = {
  name: 'Decompress',
  description: 'Decompress  file (used Brotli algorithm)',
  usage: 'decompress path_to_file path_to_destination',
  perform: async (args) => {
    const fileArchivePath = fsGetAbsPath(args[0]);
    const fileToDecompessPath = fsGetAbsPath(args[1]);

    const stats = await fsGetStats(fileArchivePath);
    if (stats.err) {
      throw new Error('Operation failed: file not found');
    }
    if (!stats.info.isFile()) {
      throw new Error('Operation failed: ' + fileArchivePath + ' not a file');
    }

    const statsTo = await fsGetStats(fileToDecompessPath);
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
