import { fsGetStats, fsGetAbsPath, envParameters } from '../../utils/shared.js';

export const cd = {
  name: 'Cd',
  description: 'Go to dedicated folder from current directory',
  usage: 'cd path_to_directory',
  perform: async (args) => {
    const newDir = fsGetAbsPath(args[0]);
    const stats = await fsGetStats(newDir);
    if (stats.err) {
      throw new Error('Operation failed: ' + stats.err.message);
    }
    if (stats.info.isDirectory()) {
      envParameters.userWorkDir = newDir;
    } else {
      throw new Error('Operation failed: path is not directory');
    }
  },
};
