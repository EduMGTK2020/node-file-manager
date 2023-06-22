import path from 'path';
import envParam from '../../utils/getEnv.js';

export const Up = {
  name: 'up',
  description: 'Go upper from current directory',
  usage: 'up',
  perform: (args) => {
    const parentDir = path.dirname(envParam.userWorkDir);
    if (parentDir != envParam.userWorkDir) {
      envParam.userWorkDir = parentDir;
    }
    return true;
  },
};
