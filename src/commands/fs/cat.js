import { readFile } from 'fs/promises';
import getAbsPath from '../../utils/getAbsPath.js';
import message from '../../console/messages.js';

export const Cat = {
  name: 'Cat',
  description: "Read file and print it's content",
  usage: 'cat path_to_file',
  perform: async (args) => {
    const filePath = getAbsPath(args[0]);
    try {
      const fileData = await readFile(filePath, 'utf-8');
      message.showSystemInfo(fileData);
    } catch {
      throw new Error('FS operation failed');
    }
  },
};
