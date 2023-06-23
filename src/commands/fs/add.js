import { writeFile } from 'fs/promises';
import getAbsPath from '../../utils/getAbsPath.js';
import message from '../../console/messages.js';

export const Add = {
  name: 'Add',
  description: 'Create empty file in current working directory',
  usage: 'add new_file_name',
  perform: async (args) => {
    const filePath = getAbsPath(args[0]);
    try {
      await writeFile(filePath, '', { flag: 'wx' });
      message.showSystemInfo('File was successfully created');
    } catch {
      throw new Error('FS operation failed');
    }
  },
};
