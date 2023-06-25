import path from 'path';
import { envParameters } from '../../utils/shared.js';

export const up = {
  name: 'Up',
  description: 'Go upper from current directory',
  usage: 'up',
  perform: async () => {
    const parentDir = path.dirname(envParameters.userWorkDir);
    if (parentDir != envParameters.userWorkDir) {
      envParameters.userWorkDir = parentDir;
    }
  },
};
