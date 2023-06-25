import { readdir } from 'fs/promises';
import { envParameters } from '../../utils/shared.js';
import message from '../../console/messages.js';

export const ls = {
  name: 'Ls',
  description:
    'Print in console list of all files and folders in current directory',
  usage: 'ls',
  perform: async (args) => {
    try {
      const listFiles = await readdir(envParameters.userWorkDir, {
        withFileTypes: true,
      });

      const listToView = listFiles
        .filter((item) => {
          return item.isFile() || item.isDirectory();
        })
        .map((item) => {
          return {
            Name: item.name,
            Type: item.isFile() ? 'file' : 'directory',
          };
        });

      if (listToView.length) {
        const byTypeAndName = (a, b) => {
          if (a.Type > b.Type) return 1;
          if (a.Type < b.Type) return -1;
          if (a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
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
