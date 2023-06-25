import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { fsGetStats, fsGetAbsPath } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const compress = {
  name: 'Compress',
  description: 'Compress file (used Brotli algorithm)',
  usage: 'compress path_to_file path_to_destination',
  perform: async (args) => {
    const fileToCompessPath = fsGetAbsPath(args[0]);
    const fileArchivePath = fsGetAbsPath(args[1]);

    const stats = await fsGetStats(fileToCompessPath);
    if (stats.err) {
      throw new Error('Operation failed: file not found');
    }
    if (!stats.info.isFile()) {
      throw new Error('Operation failed: ' + fileToCompessPath + ' not a file');
    }

    const statsTo = await fsGetStats(fileArchivePath);
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
