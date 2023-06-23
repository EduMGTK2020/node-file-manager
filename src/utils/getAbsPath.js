import path from 'path';
import env from './getEnv.js';

const getAbsPath = (filePath) =>
  path.resolve(env.Parameters.userWorkDir, filePath);

export default getAbsPath;
