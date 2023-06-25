import { writeFile } from 'fs/promises';
import { fsGetAbsPath, fsGetStats } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const add = {
  name: 'Add',
  description: 'Create empty file in current working directory',
  usage: 'add new_file_name',
  perform: async (args) => {
    const filePath = fsGetAbsPath(args[0]);

    const stats = await fsGetStats(filePath);
    if (!stats.err) {
      throw new Error('Operation failed: file already exists');
    }

    try {
      await writeFile(filePath, '', { flag: 'wx' });
      message.showSystemInfo('File successfully added');
    } catch (err) {
      throw new Error('Operation failed: ' + err.message);
    }
  },
};
