import { readdir } from 'fs/promises';
import env from '../../utils/getEnv.js';
import message from '../../console/messages.js';

export const Ls = {
  name: 'ls',
  description:
    'Print in console list of all files and folders in current directory',
  usage: 'ls',
  perform: async (args) => {
    try {
      const listFiles = await readdir(env.Parameters.userWorkDir, {
        withFileTypes: true,
      });

      const listToView = listFiles.map((item) => {
        return {
          Name: item.name,
          Type: item.isFile() ? 'file' : 'directory',
        };
      });

      if (listToView.length) {
        const byTypeAndName = (a, b) => {
          if (a.Type > b.Type) return 1;
          if (a.Type < b.Type) return -1;
          if (a.Name > b.Name) return 1;
          return -1;
        };
        listToView.sort(byTypeAndName);
        message.showTable(listToView);
      } else {
        message.showSystemInfo('Current directory is empty');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
