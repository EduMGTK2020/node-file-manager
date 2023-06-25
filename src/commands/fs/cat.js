import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';
import message from '../../console/messages.js';
import { createReadStream } from 'fs';

export const Cat = {
  name: 'Cat',
  description: "Read file and print it's content",
  usage: 'cat path_to_file',
  perform: async (args) => {
    const filePath = getAbsPath(args[0]);

    const stats = await getStats(filePath);
    if (stats.err) {
      throw new Error('Operation failed: file not found');
    }

    try {
      const stream = createReadStream(filePath);
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const fileData = Buffer.concat(chunks).toString('utf-8');
      message.showSystemInfo(fileData);
    } catch (err) {
      throw new Error('FS operation failed: ' + err.message);
    }
  },
};
