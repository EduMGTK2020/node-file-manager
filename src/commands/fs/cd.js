import { stat } from 'fs';
import env from '../../utils/getEnv.js';
import getAbsPath from '../../utils/getAbsPath.js';
import getStats from '../../utils/getStats.js';

export const Cd = {
  name: 'Cd',
  description: 'Go to dedicated folder from current directory',
  usage: 'cd path_to_directory',
  perform: async (args) => {
    const newDir = getAbsPath(args[0]);
    const stats = await getStats(newDir);
    if (stats.err) {
      throw new Error(stats.err.message);
    }
    if (stats.info.isDirectory()) {
      env.setUserWorkDir(newDir);
    }
  },
};
