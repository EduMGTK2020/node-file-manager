import path from 'path';
import env from '../../utils/getEnv.js';

export const Up = {
  name: 'Up',
  description: 'Go upper from current directory',
  usage: 'up',
  perform: async (args) => {
    const parentDir = path.dirname(env.Parameters.userWorkDir);
    if (parentDir != env.Parameters.userWorkDir) {
      env.setUserWorkDir(parentDir);
    }
  },
};
