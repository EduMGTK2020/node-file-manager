import { createReadStream } from 'fs';
import { fsGetStats, fsGetAbsPath } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const cat = {
  name: 'Cat',
  description: "Read file and print it's content",
  usage: 'cat path_to_file',
  perform: async (args) => {
    const filePath = fsGetAbsPath(args[0]);

    const stats = await fsGetStats(filePath);
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
      throw new Error('Operation failed: ' + err.message);
    }
  },
};
