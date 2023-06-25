import { readFile } from 'fs/promises';
import { createHash } from 'crypto';
import { fsGetStats, fsGetAbsPath } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const hash = {
  name: 'Hash',
  description: 'Calculate hash for file',
  usage: 'hash path_to_file',
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
      const data = await readFile(filePath);
      const hash = createHash('sha256').update(data);
      const hex = hash.digest('hex');
      message.showSystemInfo('Hash (SHA256): ' + hex);
    } catch (err) {
      throw new Error('Operation failed : ' + err.message);
    }
  },
};
